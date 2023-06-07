import { FastifyInstance } from "fastify";
import { User } from "../db/entities/User.js";
import { Boulder } from "../db/entities/Boulder.js";
import { RegistrationBody } from "../types";
import { Registration } from "../db/entities/Registration.js";


/** This function creates all the backend routes for boulder registrations by climbers
 *
 * @param {FastifyInstance} app
 * @constructor
 */
export function RegistrationRouteInit(app: FastifyInstance) {

  // Route that returns all users who ARE NOT SOFT DELETED
  app.get("/registration", async (req, reply) => {
    try {
      const allRegistrations = await req.em.find(Registration, {});
      reply.send(allRegistrations);
    } catch (err) {
      reply.status(500).send(err);
    }
  });

  app.search("/registration", async (req, reply) => {
    const { boulder } = req.body;
    try {
      const boulderEntity = await req.em.getReference(Boulder, boulder);
      const registrations = await req.em.find(Registration, { boulder: boulderEntity });

      const users = await Promise.all(registrations.map(registration => {
          return req.em.find(User, { id: registration.climber });
        }
      ));



      return reply.send(users)
    } catch (err) {
      return reply.status(500).send(err);
    }
  });

  //Create a registration between a climber and a boulder
  app.post<{ Body: RegistrationBody }>("/registration", async (req, reply) => {
    const { climber_id, boulder_id} = req.body;

    try {
      // This is a pure convenience so we don't have to keep passing User to req.em.find
      const userRepository = req.em.getRepository(User);
      const boulderRepository = req.em.getRepository(Boulder);

      const climber = await userRepository.getReference(climber_id);
      const boulder = await boulderRepository.getReference(boulder_id);

      const newAttempt = await req.em.create(Registration, {
        climber: climber,
        boulder: boulder
      });
      // Send our changes to the database
      await req.em.flush();

      // Let the user know everything went fine
      return reply.send(newAttempt);
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });


  //Delete registration
  app.delete<{ Body: RegistrationBody }>("/registration", async (req, reply) => {
    const { climber_id, boulder_id } = req.body;

    try {
      const registration = await req.em.findOneOrFail(Registration, {
      climber: climber_id,
      boulder: boulder_id,
      });
      await req.em.remove(registration).flush();
      return reply.send(registration);
    } catch (err) {
      return reply.status(500).send(err);
    }

  });



}
