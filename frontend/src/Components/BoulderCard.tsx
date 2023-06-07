import { BoulderType } from "@/SenditTypes.ts";
import { useEffect } from "react";
import { Queue } from "@/Components/Queue.tsx";

export function BoulderCard(props: BoulderType) {
  const { id, imgUri,zone, color,score, grade,note} = props;

  const minioUrl = `http://localhost:9000/sendit/${imgUri}`;

  return (
    <div className="card w-1/3 bg-base-100 shadow-xl mt-6">
      <figure className="cardImageContainer">
        <img src={minioUrl}
             alt="Shoes"
             className="cardImg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Boulder {zone}</h2>
        <p>{note}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
      <Queue
        boulder_id = {id}
      />
    </div>
  );
}