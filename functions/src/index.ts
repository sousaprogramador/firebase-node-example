import * as functions from "firebase-functions";
import app from "./infrastructure/web/expressApp";

export const api = functions.https.onRequest(app);
