import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  clientName: string;
  companyName: string;
  email: string;
  phone?: string;
  projectType: string;
  budgetRange: string;
  projectDescription: string;
  status: string;
}

const LeadSchema: Schema = new Schema({
  clientName: { 
    type: String, 
    required: [true, 'Please provide a name'],
    trim: true 
  },
  companyName: { 
    type: String, 
    required: [true, 'Please provide a company name'] 
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
  },
  phone: String,
  projectType: {
    type: String,
    required: true,
    enum: ['3D Modeling', 'Unreal Engine Dev', 'Unity Dev', 'WebGL/Three.js', 'VR/AR Experience', 'Architectural Visualization', 'Other']
  },
  budgetRange: {
    type: String,
    default: 'Not Disclosed',
    enum: ['Under $5k', '$5k - $15k', '$15k - $50k', '$50k+', 'Not Disclosed']
  },
  projectDescription: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'New',
    enum: ['New', 'Contacted', 'Qualified', 'Lost']
  }
}, { timestamps: true });

// Check if model exists before compiling (Next.js fix)
const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;