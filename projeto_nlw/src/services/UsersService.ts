import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UsersService {
    async create(email: string){

        
    const usersRepository = getCustomRepository(UsersRepository);
    // verificar se usuario existe
    const userExists = await usersRepository.findOne({
        email,
    });
    // se existir, retornar user
    if(userExists){
        return userExists;
    }
    const user = usersRepository.create({
        email,
    });
    await usersRepository.save(user);
     // se não existir, salva no DB
     return user;
    }
}

export { UsersService }
