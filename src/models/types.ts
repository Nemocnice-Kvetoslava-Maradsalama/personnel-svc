type SequelizeModelCondition = {
    where: { 
        [fieldname: string]: string 
    }
};

export interface SequelizeModel<Type> {
    findAll (condition?: SequelizeModelCondition): Promise<Type[]>;
    findByPk (pk: string): Promise<Type>;
    create(object: Type): Promise<Type>;
    update(object: Type, condition: SequelizeModelCondition): Promise<Type>;
    destroy(condition: SequelizeModelCondition): Promise<number>;
}
