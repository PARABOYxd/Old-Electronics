import { z } from 'zod';

export const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  contactNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number')
    .refine((val) => val.length === 10, 'Mobile number must be exactly 10 digits'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  address: z
    .string()
    .min(10, 'Please provide a complete address (minimum 10 characters)')
    .max(200, 'Address too long'),
  cityId: z.string().min(1, 'Please select a city'),
  pincode: z
    .string()
    .regex(/^\d{6}$/, 'Please enter a valid 6-digit Indian pincode'),
  categoryId: z.string().min(1, 'Please select a category'),
  deviceId: z.string().min(1, 'Please select a device'),
  brandId: z.string().min(1, 'Please select a brand'),
  modelId: z.string().min(1, 'Please select a device model'),
  variantId: z.string().optional().or(z.literal('')),
  conditionId: z.string().min(1, 'Please select device condition'),
  pickupDate: z.string().min(1, 'Please select pickup date').refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, 'Pickup date cannot be in the past'),
  preferredTimeSlot: z.string().min(1, 'Please select preferred time slot'),
  notes: z.string().max(500, 'Notes too long').optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

// Additional validation schemas
export const contactValidationSchema = z.object({
  contactNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number')
    .length(10, 'Mobile number must be 10 digits'),
});

export const trackingSchema = z.object({
  referenceCode: z
    .string()
    .regex(/^EZE-[A-Z0-9]{4}$/, 'Invalid reference code format')
    .min(1, 'Reference code is required'),
});