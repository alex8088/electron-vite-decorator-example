import { Sequelize, Table, Column, Model } from 'sequelize-typescript'

@Table({ timestamps: false })
export class Post extends Model<Post> {
  @Column
  title: string

  @Column
  text: string
}

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  models: [Post],
  logging: false,
  query: {
    raw: true
  }
})

export const runTest = async (): Promise<void> => {
  console.time('sequelize total')
  connection.sync({ force: true }).then(async () => {
    const post = new Post()
    post.title = 'Sequelize'
    post.text = 'Hello world'
    await post.save()
    const posts = await Post.findAll()
    console.log('sequelize test:')
    console.table(posts)
    console.timeEnd('sequelize total')
  })
}
