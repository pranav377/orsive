import { Agenda } from "agenda";
import { SCHEDULER_DB_URL } from "../../../graphql/config";

const agenda = new Agenda({ db: { address: SCHEDULER_DB_URL } });

export default agenda;
