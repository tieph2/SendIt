import { BoulderType } from "@/SenditTypes.ts";
import { useEffect } from "react";

export function BoulderCard(props: BoulderType) {
  const { imgUri,zone, color,score, grade,note} = props;

  const minioUrl = "http://localhost:9000/doggr/dog.jpg";

  return (
    <div className="card w-96 bg-base-100 shadow-xl mt-6">
      <figure><img src={minioUrl}
                   alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">Boulder {zone}</h2>
        <p>{note}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
    </div>
  );
}