import { BoulderType } from "@/DoggrTypes.ts";
import { useEffect } from "react";
import "@css/DoggrStyles.css";



export function BouderCard(props: BoulderType) {
  const { imgUri,zone, color,score, grade,note} = props;

  const minioUrl = "http://localhost:9000/doggr/" + imgUri;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src="https://random.dog/"
                   alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
