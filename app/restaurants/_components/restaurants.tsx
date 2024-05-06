"use client";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../_components/header";
import RestaurantItem from "../../_components/restaurant-item";
import { searchForRestaurant } from "./../_actions/search";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurant(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchParams]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes encontrados</h2>
        <div className="flex flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="w-full min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
