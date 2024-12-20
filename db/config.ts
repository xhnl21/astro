import { defineDb, defineTable, column  } from 'astro:db';

const Author = defineTable({
  columns: {
    id: column.number(),
    name: column.text(),
  }
});

const Comment = defineTable({
  columns: {
    authorId: column.number(),   
    author: column.text(),
    body: column.text(),
  }
})

const Item = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    value: column.text(),
  },
  indexes: {
    unique_value_idx: {
      on: ["value"],
      unique: true,
    },
  },
});

const Product = defineTable({
  columns: {
    id: column.number(),
    prduct: column.text(),
    category: column.text(),
    brand: column.text(),
    description: column.text(),
    price: column.number(),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: {Author, Comment, Item, Product }
});
