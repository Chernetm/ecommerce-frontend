import { motion } from 'framer-motion';
import { ShieldCheck, Users, Globe, Award } from 'lucide-react';

const stats = [
    { label: 'Happy Customers', value: '10k+' },
    { label: 'Brands Partnered', value: '200+' },
    { label: 'Countries Served', value: '25+' },
    { label: 'Team Members', value: '50+' },
];

const values = [
    {
        name: 'Quality First',
        description: 'We adhere to the highest standards of quality assurance for every product.',
        icon: Award,
    },
    {
        name: 'Global Sustainability',
        description: 'Our operations are 100% carbon neutral, supporting a greener planet.',
        icon: Globe,
    },
    {
        name: 'Customer Obsession',
        description: 'We believe our customers are our biggest asset and treat them as such.',
        icon: Users,
    },
    {
        name: 'Secure Shopping',
        description: 'State-of-the-art encryption ensures your data is always safe with us.',
        icon: ShieldCheck,
    },
];

export function About() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-slate-900 py-24 sm:py-32">
                <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-40"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
                        >
                            We redefine the shopping experience
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-6 text-lg leading-8 text-slate-300"
                        >
                            Established in 2024, PBL Store has grown from a small local boutique to a global fashion powerhouse.
                            We combine cutting-edge technology with timeless design to bring you products that matter.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-slate-100 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="mx-auto flex max-w-xs flex-col gap-y-4"
                            >
                                <dt className="text-base leading-7 text-slate-600">{stat.label}</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                                    {stat.value}
                                </dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* Image & Mission Section */}
            <div className="overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
                        <div className="lg:pr-8 lg:pt-4">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="lg:max-w-lg"
                            >
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Story</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    Innovating for a better tomorrow
                                </p>
                                <p className="mt-6 text-lg leading-8 text-slate-600">
                                    It started with a simple idea: make quality accessible. We scoured the globe for materials that
                                    last, partners who care, and designs that inspire. Today, we are proud to offer a collection
                                    that stands the test of time and trends.
                                </p>
                                <div className="mt-8">
                                    <div className="flex items-center gap-x-6">
                                        <div className="flex -space-x-2 overflow-hidden">
                                            <img
                                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                            <img
                                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                            <img
                                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </div>
                                        <span className="text-sm font-semibold leading-6 text-slate-900">
                                            Joined by 2000+ others
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
                                alt="Team meeting"
                                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-slate-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">Why Choose Us</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Everything you need, nothing you don't
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                            {values.map((value,_) => (
                                <motion.div
                                    key={value.name}
                                    whileHover={{ y: -10 }}
                                    className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all"
                                >
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-indigo-600">
                                        <value.icon className="h-8 w-8 text-white" aria-hidden="true" />
                                    </div>
                                    <dt className="text-xl font-bold leading-7 text-slate-900">
                                        {value.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                        <p className="flex-auto">{value.description}</p>
                                    </dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
