import dataSource from '../ormconfig.js';

class GiverRepository {
  constructor() {
    this._giverRepository = dataSource.getRepository('Giver');
  }

  orSearch(atribuites) { // Pesquisa or na tabela giver (doador)
    return this._giverRepository.findOne({
      select: ['id', 'email'],
      where: atribuites,
    });
  }

  async add(giverData) {
    const giver = await this.orSearch([
      {
        phone: giverData.phone,
      },
      {
        email: giverData.email,
      },
    ]);

    // se usuário não existir
    if (!giver) {
      return this._giverRepository.save(giverData);
    }

    /**
     * Se usuário já existir e nao possuir email
     * e agora foi enviado seu email é atualizado.
     */
    if (!giver.email && giverData.email) {
      await this.updateEmail(giver.id, giverData.email);
    }

    return { id: giver.id };
  }

  async updateEmail(giverId, email) {
    const update = await this._giverRepository.update(
      giverId,
      {
        email,
      },
    );

    return update;
  }
}
// Singleton Pattern
export default new GiverRepository();
