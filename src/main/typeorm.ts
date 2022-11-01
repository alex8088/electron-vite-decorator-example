import { Entity, PrimaryGeneratedColumn, Column, DataSource } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  text: string
}

const dataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [Post]
})

export const runTest = async (): Promise<void> => {
  console.time('typeorm total')
  dataSource.initialize().then(async () => {
    const repo = dataSource.getRepository(Post)
    if (repo) {
      const post = new Post()
      post.title = 'Typeorm'
      post.text = 'Hello world'
      await repo.save(post)
      const posts = await repo.find()
      console.log('typeorm test:')
      console.table(posts)
      console.timeEnd('typeorm total')
    }
  })
}
