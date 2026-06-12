import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDto } from './dto/user_dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;

  const mockUsers: UserDto[] = [
    new UserDto(
      1,
      'Leanne Graham',
      'Sincere@april.biz',
      { street: 'Kulas Light', city: 'Gwenborough' },
      '1-770-736-8031 x56442',
      'hildegard.org',
      { name: 'Romaguera-Crona' },
    ),
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return an array of users', async () => {
    const result = await controller.findAll();

    expect(result).toEqual(mockUsers);
    expect(usersService.findAll).toHaveBeenCalledTimes(1);
  });

  it('findOne should return a single user by id', async () => {
    const result = await controller.findOne(1);

    expect(result).toEqual(mockUsers[0]);
    expect(usersService.findOne).toHaveBeenCalledWith(1);
  });
});
