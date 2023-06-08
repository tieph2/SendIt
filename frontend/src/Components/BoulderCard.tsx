import { BoulderType, Color } from "@/SenditTypes.ts";
import { Queue } from "@/Components/Queue.tsx";

export function BoulderCard(props: BoulderType) {
  const { id, imgUri,zone, color,score, grade,note} = props;

  const minioUrl = `http://localhost:9000/sendit/${imgUri}`;

  return (
    <div className="card lg:w-1/4 m-4 md:w-1/3 bg-base-100 shadow-xl mt-6">
      <figure className="cardImageContainer">
        <img src={minioUrl}
             alt="Shoes"
             className="cardImg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Boulder {id}</h2>
        <p>Zone {zone}</p>
        <p>Score {score}</p>
        <p>Grade {grade}</p>

        <div
          className={"boulderColorBlock"}
          style=
            {
              {
                backgroundColor: `${Color[color]}`,
                color: 'white',
                textAlign: 'center',
                lineHeight: '1.5'
              }
            }
        > {color}
        </div>
        <p>Note:<br/>{note}</p>

        <h4> Current lineup</h4>
        <Queue
          boulder_id = {id}
        />

        <div className="card-actions justify-start">
          <button className="btn btn-primary">Register</button>
        </div>

      </div>

    </div>
  );
}