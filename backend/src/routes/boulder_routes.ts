import { FastifyInstance } from "fastify";
import { Boulder } from "../db/entities/Boulder.js";
import { User, UserRole } from "../db/entities/User.js";
import { ICreateBoulderBody, IUpdateBoulderBody } from "../types.js";


export function BoulderRoutesInit(app: FastifyInstance) {
/////////////////////////////////////////////////////////////////////////////
  // HOMEWORK 1
  /////////////////////////////////////////////////////////////////////////////
  app.get("/boulders", async (req, reply) => {
    try {
      const theBoulder = await req.em.find(Boulder, {});
      reply.send(theBoulder);
    } catch (err) {
      reply.status(500).send(err);
    }
  });
  /* This is where we have to be careful with the difference in a full entity
   vs a reference.  References are a Mikro-orm optimization that lets us avoid database
   queries when all we need from something is its id.  That is the case here:
   we only *need* references to these Users, not their entire data.  We don't actually care
   about any of their data except their ID, so we would like to use references here.
   Unfortunately, we're currently tracking users by their email address, not their database id!

   This is a situation where you have a choice to make.  Either we refactor a bit
   now to start using `id` everywhere rather than email address (since THAT is the field
   that links tables together in our database, not email...or we give up forever
   on enabling LOTS of optimizations.  My personal choice is to refactor, so
   the final code solution I merge into our official Doggr repo will be one
   that fixes this problem.  We'll do it the simpler way for this solution
   and take what we need from the database at any cost.
   */
  app.post<{ Body: ICreateBoulderBody }>("/boulders", async (req, reply) => {
    const { zone, color, score, grade, note } = req.body;

    try {

      // Create the new boulder problem
      const newBoulder = await req.em.create(Boulder, {
        zone: 1,
        color: 'red',
        score: 1000,
        grade: 6,
        note: 'This is a note for boulder 1'
      });
      // Send our changes to the database
      await req.em.flush();

      // Let the user know everything went fine
      return reply.send(newBoulder);
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });

  // Search for a boulder problem
  app.search<{ Body: { boulder_id: number } }>("/boulders", async (req, reply) => {
    const { boulder_id } = req.body;

    try {
      const boulder = await req.em.find(Boulder, { id: boulder_id });
      return reply.send(boulder);
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });

  //Update a boulder problem
  app.put<{ Body: IUpdateBoulderBody }>("/boulders", async (req, reply) => {
    const { id, score, grade, note} = req.body;

    try {
      const boulder = await req.em.findOneOrFail(Boulder, id, {strict: true});
      boulder.score = score;
      boulder.grade = grade;
      boulder.note = note;
      await req.em.persistAndFlush(boulder);
      return reply.send(boulder);
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });



  // Delete a boulder problem after checking user is a  judge
  app.delete<{ Body: { my_id: number, boulder_id: number; password: string } }>("/boulders", async (req, reply) => {
    const { my_id, boulder_id, password } = req.body;

    console.log("Print")
    try {
      // Authenticate my user's role
      const me = await req.em.findOneOrFail(User, my_id, {strict: true});
      // Check passwords match
      if (me.password !== password) {
        return reply.status(401).send();
      }

      // Make sure the requester is an Admin
      if (me.role !== UserRole.JUDGE) {
        return reply.status(401).send({ "message": "You are not an judge!"})
      }


      const boulderToDelete = await req.em.findOneOrFail(Boulder, boulder_id, {strict: true});
      await req.em.removeAndFlush(boulderToDelete);
      return reply.send();
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });

}
