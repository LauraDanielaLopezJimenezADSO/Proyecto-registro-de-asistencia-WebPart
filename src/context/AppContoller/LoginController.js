import {LoginAprendiz, LoginInstructor} from "../API/APISessionManager/API_Login.js";

export default async function LoginController(User, Pass, tipo){
    switch (tipo) {
        case "Instructor":
            try {
                return LoginInstructor(User, Pass);
            } catch (e) {
                return null
            }

        case "Aprendiz":
            try {
                return LoginAprendiz(User, Pass);
            } catch (e) {
                return null;
            }

        default:
            return null;
    }
}