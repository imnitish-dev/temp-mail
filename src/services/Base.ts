import { Document, FilterQuery, Model } from 'mongoose';

class BaseService<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async getAll(filter: FilterQuery<T>, options: { page?: number; limit?: number } = { page: 1, limit: 10 }): Promise<T[]> {
    const skip = (options.page - 1) * options.limit;
    return this.model.find(filter).limit(options.limit).skip(skip);
  }

  public async getOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }

  public async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  public async update(filter: FilterQuery<T>, data: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, data, { new: true });
  }

  public async delete(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOneAndDelete(filter);
  }

  public async count(filter: FilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter);
  }

  public async deleteMany(filter: FilterQuery<T>): Promise<void> {
    await this.model.deleteMany(filter);
  }

  public async aggregate(pipeline: any[]): Promise<any[]> {
    return this.model.aggregate(pipeline);
  }
}

export default BaseService;
