import React from "react";

type MoviePageParamsType = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: MoviePageParamsType) {
  const { id } = await params;
  return (
    <div>
      <h1>Movie ID: {id}</h1>
    </div>
  );
}
