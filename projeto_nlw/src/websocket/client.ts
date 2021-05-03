import { SimpleConsoleLogger } from "typeorm";
import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";


io.on("connect", (socket)=>{

    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();

    socket.on("client_first_access", async (params) =>{
        const socket_id = socket.id;
        const { text, email } = params;

        const userExists = await usersService.findByEmail(email);
        // console.log(params);
        if(!userExists) {
            const user = await usersService.create(email);

            await connectionsService.create({
                socket_id,
                user_id: userExists.id
            })
        }

        
        // Salvar conexão com socket_id, user_id
        
    });
});

