'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { bookingSchema, BookingFormData } from '@/lib/validations/booking';
import { Calendar, Clock, IndianRupee, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  cities: Array<{ id: string; name: string; state: string }>;
  categories: Array<{ id: string; name: string; devices: Array<{ id: string; name: string; brands: Array<{ id: string; name: string; models: Array<{ id: string; name: string; variants: Array<{ id: string; name: string }> }> }> }> }>;
  conditions: Array<{ id: string; name: string; multiplier: number }>;
}

const timeSlots = [
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM',
];
// ✅ Dummy Data
const dummyFormData: FormData = {
  cities: [
    { id: '1', name: 'Delhi', state: 'Delhi' },
    { id: '2', name: 'Mumbai', state: 'Maharashtra' },
    { id: '3', name: 'Bangalore', state: 'Karnataka' },
  ],
  categories: [
    {
      id: 'c1',
      name: 'Smartphone',
      devices: [
        {
          id: 'd1',
          name: 'iPhone',
          brands: [
            {
              id: 'b1',
              name: 'Apple',
              models: [
                {
                  id: 'm1',
                  name: 'iPhone 13',
                  variants: [
                    { id: 'v1', name: '128GB' },
                    { id: 'v2', name: '256GB' },
                  ],
                },
                {
                  id: 'm2',
                  name: 'iPhone 12',
                  variants: [{ id: 'v3', name: '64GB' }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'c2',
      name: 'Laptop',
      devices: [
        {
          id: 'd2',
          name: 'MacBook',
          brands: [
            {
              id: 'b2',
              name: 'Apple',
              models: [
                {
                  id: 'm3',
                  name: 'MacBook Pro M1',
                  variants: [{ id: 'v4', name: '512GB SSD' }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  conditions: [
    { id: 'cond1', name: 'Like New', multiplier: 1 },
    { id: 'cond2', name: 'Good', multiplier: 0.8 },
    { id: 'cond3', name: 'Fair', multiplier: 0.6 },
    { id: 'cond4', name: 'Broken', multiplier: 0.3 },
  ],
};

export function PickupBookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const selectedCategoryId = watch('categoryId');
  const selectedDeviceId = watch('deviceId');
  const selectedBrandId = watch('brandId');
  const selectedModelId = watch('modelId');
  const selectedConditionId = watch('conditionId');

  // useEffect(() => {
  //   fetchFormData();
  // }, []);
  useEffect(() => {
    // ✅ Load dummy data instead of API
    setFormData(dummyFormData);
  }, []);

  useEffect(() => {
    if (selectedModelId && selectedConditionId) {
      calculatePrice();
    }
  }, [selectedModelId, selectedConditionId]);

  const fetchFormData = async () => {
    try {
      const response = await fetch('/api/form-data');
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Failed to fetch form data:', error);
    }
  };

  const calculatePrice = async () => {
    try {
      const response = await fetch('/api/calculate-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelId: selectedModelId,
          conditionId: selectedConditionId,
        }),
      });
      const data = await response.json();
      setEstimatedPrice(data.estimatedPrice || 0);
    } catch (error) {
      console.error('Failed to calculate price:', error);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, estimatedPrice }),
      });

      if (response.ok) {
        const booking = await response.json();
        window.location.href = `/track/${booking.referenceCode}`;
      }
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
      </div>
    );
  }

  const selectedCategory = formData.categories.find(c => c.id === selectedCategoryId);
  const selectedDevice = selectedCategory?.devices.find(d => d.id === selectedDeviceId);
  const selectedBrand = selectedDevice?.brands.find(b => b.id === selectedBrandId);
  const selectedModel = selectedBrand?.models.find(m => m.id === selectedModelId);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= i ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}
            >
              {i}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Device Details</span>
          <span>Pickup Info</span>
          <span>Confirmation</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-green-600" />
                    Device Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select onValueChange={(value) => setValue('categoryId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.categoryId && (
                        <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
                      )}
                    </div>

                    {selectedCategory && (
                      <div>
                        <Label htmlFor="device">Device *</Label>
                        <Select onValueChange={(value) => setValue('deviceId', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select device" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedCategory.devices.map((device) => (
                              <SelectItem key={device.id} value={device.id}>
                                {device.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {selectedDevice && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brand">Brand *</Label>
                        <Select onValueChange={(value) => setValue('brandId', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedDevice.brands.map((brand) => (
                              <SelectItem key={brand.id} value={brand.id}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedBrand && (
                        <div>
                          <Label htmlFor="model">Model *</Label>
                          <Select onValueChange={(value) => setValue('modelId', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedBrand.models.map((model) => (
                                <SelectItem key={model.id} value={model.id}>
                                  {model.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.modelId && (
                            <p className="text-red-500 text-sm">{errors.modelId.message}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {selectedModel && selectedModel.variants.length > 0 && (
                    <div>
                      <Label htmlFor="variant">Variant (Optional)</Label>
                      <Select onValueChange={(value) => setValue('variantId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select variant" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedModel.variants.map((variant) => (
                            <SelectItem key={variant.id} value={variant.id}>
                              {variant.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="condition">Condition *</Label>
                    <Select onValueChange={(value) => setValue('conditionId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.conditions.map((condition) => (
                          <SelectItem key={condition.id} value={condition.id}>
                            {condition.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.conditionId && (
                      <p className="text-red-500 text-sm">{errors.conditionId.message}</p>
                    )}
                  </div>

                  {estimatedPrice > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <IndianRupee className="h-5 w-5" />
                        <span className="text-lg font-semibold">
                          Estimated Price: ₹{estimatedPrice}
                        </span>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                        Final price may vary after physical inspection
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!estimatedPrice}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Next: Pickup Details
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Contact & Pickup Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        {...register('customerName')}
                        placeholder="Enter your full name"
                      />
                      {errors.customerName && (
                        <p className="text-red-500 text-sm">{errors.customerName.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="contactNumber">Contact Number *</Label>
                      <Input
                        {...register('contactNumber')}
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                      />
                      {errors.contactNumber && (
                        <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Complete Address *</Label>
                    <Textarea
                      {...register('address')}
                      placeholder="Enter your complete pickup address"
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Select onValueChange={(value) => setValue('cityId', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.cities.map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}, {city.state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.cityId && (
                        <p className="text-red-500 text-sm">{errors.cityId.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        {...register('pincode')}
                        placeholder="Enter 6-digit pincode"
                        maxLength={6}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-sm">{errors.pincode.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickupDate">Preferred Pickup Date *</Label>
                      <Input
                        {...register('pickupDate')}
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.pickupDate && (
                        <p className="text-red-500 text-sm">{errors.pickupDate.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="preferredTimeSlot">Preferred Time Slot *</Label>
                      <Select onValueChange={(value) => setValue('preferredTimeSlot', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.preferredTimeSlot && (
                        <p className="text-red-500 text-sm">{errors.preferredTimeSlot.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      {...register('notes')}
                      placeholder="Any special instructions or additional information"
                      rows={2}
                    />
                  </div>

                  {/* Contact Options */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-medium mb-3">Need help? Contact us directly:</p>
                    <div className="flex flex-wrap gap-3">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE?.replace('+', '')}`}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Review Booking
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Booking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Device Details</h4>
                      <div className="text-sm space-y-1">
                        <p><span className="font-medium">Category:</span> {selectedCategory?.name}</p>
                        <p><span className="font-medium">Device:</span> {selectedDevice?.name}</p>
                        <p><span className="font-medium">Brand:</span> {selectedBrand?.name}</p>
                        <p><span className="font-medium">Model:</span> {selectedModel?.name}</p>
                        <p><span className="font-medium">Condition:</span> {formData.conditions.find(c => c.id === selectedConditionId)?.name}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Pickup Details</h4>
                      <div className="text-sm space-y-1">
                        <p><span className="font-medium">Name:</span> {watch('customerName')}</p>
                        <p><span className="font-medium">Contact:</span> {watch('contactNumber')}</p>
                        <p><span className="font-medium">Email:</span> {watch('email') || 'Not provided'}</p>
                        <p><span className="font-medium">Date:</span> {watch('pickupDate')}</p>
                        <p><span className="font-medium">Time:</span> {watch('preferredTimeSlot')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                        Estimated Payment:
                      </span>
                      <span className="text-2xl font-bold text-green-700 dark:text-green-400">
                        ₹{estimatedPrice}
                      </span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-500 mt-2">
                      * Final amount will be confirmed after physical inspection
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  disabled={isSubmitting}
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Confirming...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}