import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDto } from './dto/user_dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;

  const mockUsers: UserDto[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      address: { street: 'Kulas Light', city: 'Gwenborough' },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: { name: 'Romaguera-Crona' },
    },
  ];

  beforeEach(async () => {
    usersService = {
      findAll: jest.fn().mockResolvedValue(mockUsers),
      findOne: jest.fn().mockResolvedValue(mockUsers[0]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('Inicialização do controlador', () => {
    it('deve criar a instância do controlador com sucesso', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('Busca de usuários', () => {
    it('deve retornar a lista completa de usuários', async () => {
      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(mockUsers);
      expect(usersService.findAll).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um usuário ao informar um ID válido', async () => {
      // Arrange
      const userId = 1;

      // Act
      const result = await controller.findOne(userId);

      // Assert
      expect(result).toEqual(mockUsers[0]);
      expect(usersService.findOne).toHaveBeenCalledWith(userId);
      expect(usersService.findOne).toHaveBeenCalledTimes(1);
    });
  });
});