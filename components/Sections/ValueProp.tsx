import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Home, Wallet, Activity, ChevronDown, UserCheck, HeartPulse } from 'lucide-react';
import { Card } from '../ui/Card';

const MaskedSymptomsCard = () => {
    return (
        <div className="bg-white p-8 md:p-10 rounded-[32px] text-gray-900 shadow-xl border border-gray-100 flex flex-col justify-center h-full">
            <div className="flex items-start gap-4 mb-6">
                <div className="bg-[#FF8E00]/10 p-2.5 rounded-xl text-[#FF8E00] shrink-0 mt-1">
                    <AlertCircle size={24} strokeWidth={2.5} />
                </div>
                <h4 className="text-2xl font-bold text-[#003F7D] leading-tight pr-4">More than 6 out of 10 pets instinctively hide their symptoms.</h4>
            </div>
            <p className="text-gray-600 leading-relaxed font-medium">
                Catching issues late is dangerous and 3x more expensive. Stay ahead with regular diagnostics.
            </p>
        </div>
    );
};

export const ValueProp: React.FC = () => {
    return (
        <section id="value" className="py-16 md:py-32 relative bg-transparent">
            {/* Soft background shape */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.4] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255, 142, 0, 0.1) 0%, transparent 70%)' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-[56px] font-bold tracking-tight text-gray-900 mb-4"
                    >
                        Proactive Care, At Home
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 font-medium"
                    >
                        We make pet health easy, stress-free, and affordable.
                    </motion.p>
                </div>

                <div className="bg-white/30 backdrop-blur-md rounded-[40px] p-8 md:p-12 lg:p-16 border border-white/60 shadow-lg max-w-[1400px] mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                        {/* Left Column: The Cost Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-5 h-full"
                        >
                            <MaskedSymptomsCard />
                        </motion.div>

                        {/* Right Column: The 4 Benefits Grid */}
                        <div className="lg:col-span-7 flex flex-col justify-between gap-4 h-full">
                            {/* Benefit 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5 flex-1"
                            >
                                <div className="bg-[#FF8E00]/10 p-2.5 rounded-xl text-[#FF8E00] shrink-0">
                                    <UserCheck size={24} />
                                </div>
                                <div className="mt-0.5">
                                    <h4 className="text-[22px] font-bold text-gray-900 tracking-tight leading-none mb-2">Expert Oversight</h4>
                                    <p className="text-gray-500 text-[15px] leading-snug">Licensed veterinarians manage every detail of your pet's health plan.</p>
                                </div>
                            </motion.div>

                            {/* Benefit 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                                className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5 flex-1"
                            >
                                <div className="bg-[#FF8E00]/10 p-2.5 rounded-xl text-[#FF8E00] shrink-0">
                                    <HeartPulse size={24} />
                                </div>
                                <div className="mt-0.5">
                                    <h4 className="text-[22px] font-bold text-gray-900 tracking-tight leading-none mb-2">Early Detection</h4>
                                    <p className="text-gray-500 text-[15px] leading-snug">Catch health issues before they become emergencies.</p>
                                </div>
                            </motion.div>

                            {/* Benefit 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                                className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5 flex-1"
                            >
                                <div className="bg-[#FF8E00]/10 p-2.5 rounded-xl text-[#FF8E00] shrink-0">
                                    <Home size={24} />
                                </div>
                                <div className="mt-0.5">
                                    <h4 className="text-[22px] font-bold text-gray-900 tracking-tight leading-none mb-2">Stress-Free Visits</h4>
                                    <p className="text-gray-500 text-[15px] leading-snug">No clinic travel or waiting rooms. We come to you.</p>
                                </div>
                            </motion.div>

                            {/* Benefit 4 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                                className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-5 flex-1"
                            >
                                <div className="bg-[#FF8E00]/10 p-2.5 rounded-xl text-[#FF8E00] shrink-0">
                                    <Wallet size={24} />
                                </div>
                                <div className="mt-0.5">
                                    <h4 className="text-[22px] font-bold text-gray-900 tracking-tight leading-none mb-2">Predictable Costs</h4>
                                    <p className="text-gray-500 text-[15px] leading-snug">One flat subscription. No surprise emergency bills.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};