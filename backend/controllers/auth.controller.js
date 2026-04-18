const User = require('../models/User');

const register = async (req, res) => {
  const { firebaseUid, email, displayName, photoURL, role: providedRole } = req.body;
  if (!firebaseUid || !email) {
    return res.status(400).json({ success: false, message: 'firebaseUid and email are required' });
  }

  // Determine role. If frontend provided one (applicant or admin), use it.
  let role = email === 'admin@system.local' || firebaseUid.startsWith('dev_admin') ? 'admin' : 'applicant';
  if (providedRole === 'admin' || providedRole === 'applicant') {
    role = providedRole;
  }

  try {
    let user = await User.findOne({ firebaseUid }).lean();
    if (user) {
      // Update display info, and potentially role if they explicitly chose a different portal
      const updateData = { displayName, photoURL };
      if (providedRole) updateData.role = providedRole;
      
      user = await User.findOneAndUpdate(
        { firebaseUid },
        updateData,
        { new: true, lean: true }
      );
      return res.json({ success: true, data: user });
    }
    const newUser = await User.create({ firebaseUid, email, displayName, photoURL, role });
    res.status(201).json({ success: true, data: newUser.toObject ? newUser.toObject() : newUser });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
};

const updateProfile = async (req, res) => {
  const { skills, preferredRoles, displayName, companyName, companyDetails, expectedSalary, experienceLevel, location, companySize, industry } = req.body;
  const updateFields = {};
  
  if (skills !== undefined) updateFields.skills = skills;
  if (preferredRoles !== undefined) updateFields.preferredRoles = preferredRoles;
  if (displayName !== undefined) updateFields.displayName = displayName;
  if (companyName !== undefined) updateFields.companyName = companyName;
  if (companyDetails !== undefined) updateFields.companyDetails = companyDetails;
  
  // New fields
  if (expectedSalary !== undefined) updateFields.expectedSalary = expectedSalary;
  if (experienceLevel !== undefined) updateFields.experienceLevel = experienceLevel;
  if (location !== undefined) updateFields.location = location;
  if (companySize !== undefined) updateFields.companySize = companySize;
  if (industry !== undefined) updateFields.industry = industry;

  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true, lean: true }
    );
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error in updateProfile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = { register, getProfile, updateProfile };
