import { USERS } from "../data/db-data.js";
export function postLogin(req, res) {
    const data = req.body;
    let email = data.email;
    let password = data.password;
    let user = null;
    let users = Object.values(USERS);
    for (let u of users) {
        if (u.email == email && u.password == password) {
            user = u;
        }
    }
    res.status(200).json(user);
}
export function getUsers(req, res) {
    // res.status(200).json({ data: Object.values(USERS) });
    res.status(200).json(Object.values(USERS));
}
export function getUserById(req, res) {
    // To prevent the ID "0" we'll simply subtract by one. This way we can query for id = 2 which will serve us 1, etc. 
    //   const idx = req.params.id - 1;
    //   if (!user[idx]) {
    //     return res.status(404).json({ error: "user not found" });
    //   }
    //   return res.json(user[idx]);
    const email = req.params["email"];
    const users = Object.values(USERS); // users;
    const user = users.find((user) => user.email == email);
    res.status(200).json(user);
}
//# sourceMappingURL=get-users.route.js.map