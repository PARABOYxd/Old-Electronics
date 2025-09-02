'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Package, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function TrackPage() {
  const [referenceCode, setReferenceCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (referenceCode.trim()) {
      setIsSearching(true);
      window.location.href = `/track/${referenceCode.trim().toUpperCase()}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Track Your Pickup
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Enter your reference code to check your pickup status
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-600" />
              Enter Reference Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="referenceCode">Reference Code</Label>
              <Input
                id="referenceCode"
                value={referenceCode}
                onChange={(e) => setReferenceCode(e.target.value)}
                placeholder="Enter your reference code (e.g., EZE-5G7H)"
                className="mt-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <p className="text-sm text-gray-500 mt-1">
                You received this code via SMS/Email after booking
              </p>
            </div>

            <Button
              onClick={handleSearch}
              disabled={!referenceCode.trim() || isSearching}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Track Pickup
                </>
              )}
            </Button>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3">
                Need help? Contact us directly:
              </p>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE?.replace('+', '')}`}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}