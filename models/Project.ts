import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techBadges: string[];
  liveLink: string;
  githubLink?: string;
  featured: boolean;
  category: string;
  architecture: {
    auth: string;
    database: string;
    caching: string;
    apis: string;
    systemHighlights: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    techBadges: [{ type: String }],
    liveLink: { type: String, required: true },
    githubLink: { type: String },
    featured: { type: Boolean, default: false },
    category: { type: String, required: true },
    architecture: {
      auth: { type: String, default: "Standard JWT" },
      database: { type: String, default: "MongoDB" },
      caching: { type: String, default: "In-Memory / Redis" },
      apis: { type: String, default: "REST & Server Actions" },
      systemHighlights: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
