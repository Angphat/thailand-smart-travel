import { Utensils } from "lucide-react";
import { Food } from "@/types/food";

interface FoodCardProps {
  food: Food;
}

export default function FoodCard({ food }: FoodCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-sand bg-cream-light shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden bg-sand/30">
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rust/10 text-rust">
            <Utensils size={17} />
          </div>

          <h3 className="font-heading font-bold text-ink">{food.name}</h3>
        </div>

        <p className="mt-3 text-sm leading-6 text-ink/60">{food.description}</p>
      </div>
    </article>
  );
}
