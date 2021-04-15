// import { BaseEntity } from "typeorm";
// import randomInteger from "./random-int";

// export function getCloneEntity(entity: BaseEntity): Array<BaseEntity> {
//   return Array(20).fill('data').map((val, index) => {
//     return queryRunner.manager.create(entity, {
//         login: `login${index}`,
//         password: `${val}${index}`,
//         age: randomInteger(3, 130)
//     });
//   })
// }
// await queryRunner.manager.save(users);
