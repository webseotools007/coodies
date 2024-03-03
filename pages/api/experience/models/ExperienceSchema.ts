import { model, models, Schema, Types } from 'mongoose';

interface IUserExperience {
    userId: Types.ObjectId;
    companyName: string;
    position: string;
    startDate: Date;
    endDate: Date;
    isPresentCompany: boolean;
    summary: string;
    techStack: [];
}

const ExperienceSchema = new Schema<IUserExperience>(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'users', index: true },
        companyName: {
            type: String,
            required: [true, 'Company name is required'],
        },
        position: {
            type: String,
            required: [true, 'Position is required'],
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        endDate: {
            type: Date,
            default: null,
        },
        isPresentCompany: {
            type: Boolean,
            default: false,
        },
        summary: {
            type: String,
            default: null,
        },
        techStack: {
            type: [String],
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Experience = models.experiences || model<IUserExperience>('experiences', ExperienceSchema);

export default Experience;
