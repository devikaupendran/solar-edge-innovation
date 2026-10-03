<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Mail\ContactInquiryMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Handle incoming contact form submission.
     */
    public function send(ContactRequest $request): JsonResponse
    {
        $validated = $request->validated();

        try {
            $toEmail = config('mail.to_email', env('MAIL_TO_ADDRESS', 'devikaupendranr@gmail.com'));

            Mail::to($toEmail)->send(new ContactInquiryMail($validated));

            return response()->json([
                'success' => true,
                'message' => 'Your message has been sent successfully.',
            ]);
        } catch (\Throwable $e) {
            Log::error('Contact form email failed: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to send your message. Please try again later.',
            ], 500);
        }
    }
}
