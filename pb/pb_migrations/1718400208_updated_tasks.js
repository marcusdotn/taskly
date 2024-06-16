/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmlgamre0t1he8k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kb8q33by",
    "name": "done",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmlgamre0t1he8k")

  // remove
  collection.schema.removeField("kb8q33by")

  return dao.saveCollection(collection)
})
