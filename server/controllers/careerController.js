import Career from '../models/Career.js';
import JobApplication from '../models/JobApplication.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import Employee from '../models/Employee.js';
import { AppError } from '../middleware/error.js';
import { logAuditEvent } from '../middleware/audit.js';

export const getCareers = async (req, res, next) => {
  try {
    const careers = await Career.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: careers.length, data: careers });
  } catch (error) {
    next(error);
  }
};

export const getCareerById = async (req, res, next) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return next(new AppError('Position not found', 404));
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

export const createCareer = async (req, res, next) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

export const updateCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!career) return next(new AppError('Position not found', 404));
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

export const deleteCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return next(new AppError('Position not found', 404));
    res.status(200).json({ success: true, message: 'Position removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit Job Application (Public)
export const applyForJob = async (req, res, next) => {
  try {
    const { careerId, fullName, email, phone, portfolioUrl, resumeUrl, coverLetter, yearsOfExperience } = req.body;

    if (!careerId || !fullName || !email || !phone) {
      return next(new AppError('Please complete all required fields.', 400));
    }

    const application = await JobApplication.create({
      career: careerId,
      fullName,
      email,
      phone,
      portfolioUrl,
      resumeUrl,
      coverLetter,
      yearsOfExperience: Number(yearsOfExperience) || 1,
      status: 'PENDING',
    });

    // Notify admins
    const admins = await User.find({ role: { $in: ['admin', 'superadmin'] } });
    for (const admin of admins) {
      await Notification.create({
        recipient: admin._id,
        title: 'New Job Application',
        message: `${fullName} applied for a position at Lumière Studios.`,
        type: 'CAREER_APPLICATION',
        link: '/admin/applications',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Application received. Our talent team will review your portfolio.',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all job applications (Admin)
export const getApplications = async (req, res, next) => {
  try {
    const applications = await JobApplication.find()
      .populate('career', 'title department location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status & Auto-Provision Hired Employee (Admin)
// @route   PATCH /api/careers/applications/:id/status
// @access  Private/Admin
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, adminNotes, offeredRole, offeredSalary, joiningDate } = req.body;
    const application = await JobApplication.findById(req.params.id).populate('career');
    if (!application) return next(new AppError('Application not found', 404));

    application.status = status;
    if (adminNotes !== undefined) application.adminNotes = adminNotes;

    let hiredEmployee = null;

    if (status.toLowerCase() === 'hired') {
      const email = application.email.toLowerCase().trim();
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          name: application.fullName,
          email,
          password: 'Employee@2026',
          phone: application.phone,
          role: 'employee',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          isActive: true,
          isVerified: true,
        });
      } else {
        user.role = 'employee';
        user.isActive = true;
        await user.save();
      }

      let employee = await Employee.findOne({ user: user._id });
      const roleTitle = offeredRole || application.career?.title || 'Production Crew Specialist';
      const department = application.career?.department || 'Production Crew';

      if (!employee) {
        const randomCode = Math.floor(100 + Math.random() * 900);
        employee = await Employee.create({
          user: user._id,
          employeeCode: `EMP-MLP-${randomCode}`,
          designation: roleTitle,
          department,
          skills: ['Cinematography', 'Editing', 'Shoot Logistics'],
          gearList: ['Sony Alpha System', 'DJI Stabilizer Kit'],
          experienceYears: application.yearsOfExperience || 2,
          rating: 5.0,
          availabilityStatus: 'Available',
        });
      } else {
        employee.designation = roleTitle;
        await employee.save();
      }

      application.hiringDetails = {
        offeredRole: roleTitle,
        offeredSalary: Number(offeredSalary) || 45000,
        joiningDate: joiningDate ? new Date(joiningDate) : new Date(+new Date() + 7 * 24 * 3600 * 1000),
        offerLetterGenerated: true,
        employeeUser: user._id,
        hiredAt: new Date(),
        hiredBy: req.user?._id,
      };

      hiredEmployee = {
        userId: user._id,
        name: user.name,
        email: user.email,
        temporaryPassword: 'Employee@2026',
        designation: roleTitle,
      };

      await logAuditEvent(req, 'HIRE_CANDIDATE', 'JobApplication', application._id, {
        candidateName: application.fullName,
        offeredRole: roleTitle,
        offeredSalary: application.hiringDetails.offeredSalary,
      });

      await Notification.create({
        recipient: user._id,
        title: 'Welcome to Moonlight Production Team!',
        message: `Congratulations ${application.fullName}! You have been onboarded as ${roleTitle}. Your default credentials are ready.`,
        type: 'SYSTEM_NOTIFICATION',
        link: '/employee/dashboard',
      });
    }

    await application.save();

    res.status(200).json({
      success: true,
      message: status.toLowerCase() === 'hired'
        ? `Candidate ${application.fullName} has been hired! Employee account created.`
        : `Application status updated to ${status}`,
      data: application,
      hiredEmployee,
    });
  } catch (error) {
    next(error);
  }
};

