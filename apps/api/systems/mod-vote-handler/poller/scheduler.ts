import { Agenda } from "agenda";

const agenda = new Agenda({ db: { address: process.env.SCHEDULER_DB_URL! } });

export default agenda;
