<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'id' => 1,
                'question' => 'Do you offer free on-site solar inspections and feasibility surveys?',
                'answer' => 'Yes! Our certified solar engineering specialists provide complimentary site surveys across Trivandrum, Kollam, and nearby regions across Kerala. We inspect your rooftop orientation, shading analysis, electrical load, and structure to calculate optimal solar yield and customized savings.',
                'category' => 'Residential Solar',
                'sort_order' => 1,
                'status' => 'published',
            ],
            [
                'id' => 2,
                'question' => 'Can you help us apply for PM Surya Ghar Muft Bijli Yojana subsidies?',
                'answer' => 'Absolutely. We handle end-to-end documentation, KSEB net-metering approvals, and national subsidy portal filings for the PM Surya Ghar Muft Bijli Yojana. Eligible residential rooftop customers can claim direct central government subsidies of up to ₹78,000.',
                'category' => 'Residential Solar',
                'sort_order' => 2,
                'status' => 'published',
            ],
            [
                'id' => 3,
                'question' => 'How quickly does your team respond to consultation requests?',
                'answer' => 'Our technical customer support team typically reviews all submitted inquiries and responds within 2 to 4 business hours. For urgent inquiries or immediate site visit bookings, you can also reach us directly via WhatsApp or phone at +91 95268 01406.',
                'category' => 'General',
                'sort_order' => 3,
                'status' => 'published',
            ],
            [
                'id' => 4,
                'question' => 'What warranties and service assurances are provided with installations?',
                'answer' => 'We provide tier-1 MNRE/ALMM approved solar modules with up to 25 to 27 years linear power performance warranty, 5 to 10 years inverter manufacturer warranty, and comprehensive post-installation maintenance and system monitoring support.',
                'category' => 'General',
                'sort_order' => 4,
                'status' => 'published',
            ],
            [
                'id' => 5,
                'question' => 'Do you provide hybrid backup systems for locations with frequent power cuts?',
                'answer' => 'Yes, our hybrid solar and inverter systems automatically switch between solar energy, battery backup, and the grid within milliseconds during blackouts, ensuring complete uninterrupted power for your lighting, fans, air conditioning, and IT equipment.',
                'category' => 'Inverters & Batteries',
                'sort_order' => 5,
                'status' => 'published',
            ],
            [
                'id' => 6,
                'question' => 'How much rooftop area is required for a 3kW or 5kW solar plant?',
                'answer' => 'Typically, a 1kW solar installation requires approximately 80 to 100 square feet of shadow-free rooftop space. Therefore, a standard 3kW residential system requires around 250 to 300 sq.ft., and a 5kW system requires approximately 450 to 500 sq.ft.',
                'category' => 'Residential Solar',
                'sort_order' => 6,
                'status' => 'published',
            ],
            [
                'id' => 7,
                'question' => 'How does KSEB net metering work with on-grid solar systems?',
                'answer' => 'With on-grid solar and a bi-directional KSEB net meter, excess solar power generated during peak daylight hours is exported back to the KSEB power grid. At night or during cloudy periods, you import energy as needed. You are only billed for the net units consumed, dramatically reducing or eliminating your bi-monthly electricity bill.',
                'category' => 'Solar',
                'sort_order' => 7,
                'status' => 'published',
            ],
            [
                'id' => 8,
                'question' => 'Do you also provide CCTV security and electrical inverter backup solutions?',
                'answer' => 'Yes, Solar Edge Innovation offers integrated smart living services including high-definition IP & HD CCTV surveillance systems, tubular battery backup solutions, solar water heaters, and energy-efficient lightning surge protection systems.',
                'category' => 'CCTV',
                'sort_order' => 8,
                'status' => 'published',
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::updateOrCreate(
                ['id' => $faq['id']],
                $faq
            );
        }
    }
}
