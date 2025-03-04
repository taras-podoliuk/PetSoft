"use client";

import { usePetContext } from "@/lib/hooks";

import Image from "next/image";
import PetButton from "./PetButton";
import { Pet } from "@prisma/client";
import { useTransition } from "react";

export default function PetDetails() {
  const { selectedPet } = usePetContext();
  return (
    <section className="w-full h-full flex flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

function EmptyView() {
  return (
    <p className="text-2xl font-medium h-full flex justify-center items-center">
      No pet selected
    </p>
  );
}

type Props = {
  pet: Pet;
};

function TopBar({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext();
  const [_, startTransition] = useTransition();

  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={pet.imageUrl}
        alt="Selected pet image"
        width={75}
        height={75}
        className="w-[75px] h-[75px] rounded-full object-cover"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet.name}</h2>

      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          onClick={async () =>
            startTransition(async () => await handleCheckoutPet(pet.id))
          }
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ pet }: Props) {
  return (
    <div className="py-10 px-5 flex justify-around text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: Props) {
  return (
    <section className="bg-white px-7 py-5 mb-9 mx-8 rounded-md flex-1 border border-light">
      {pet.notes}
    </section>
  );
}
