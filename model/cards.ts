import mongoose, { Schema, model, models } from 'mongoose';

const cardSchema = new Schema({
  cardName: {
    type: String,
    required: true,
    unique: true,
  },
});

const cardModel = models.Cards || model('Cards', cardSchema);

export default cardModel;