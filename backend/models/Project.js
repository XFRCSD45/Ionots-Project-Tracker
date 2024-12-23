import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
    name: String,
    completed: { type: Boolean, default: false },
    isCritical: { type: Boolean, default: false}
});

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    assignedTo: String,
    status: { type: String, enum: ['newlyAssigned', 'pending', 'completed'], default: 'newlyAssigned' },
    progress: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    tasks: [TaskSchema],
});

export default model('Project', ProjectSchema);
