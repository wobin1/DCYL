import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting seed...");

    // Clear existing CMS data (keep submissions and users)
    await prisma.teamMember.deleteMany();
    await prisma.partner.deleteMany();
    await prisma.event.deleteMany();
    await prisma.volunteerRole.deleteMany();
    await prisma.donationTier.deleteMany();
    await prisma.annualReport.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.impactMetric.deleteMany();
    await prisma.program.deleteMany();
    await prisma.milestone.deleteMany();
    await prisma.value.deleteMany();
    await prisma.siteSettings.deleteMany();

    console.log("✅ Cleared existing CMS data");

    // Site Settings
    await prisma.siteSettings.create({
        data: {
            mission:
                "Empowering the next generation of Nigerian leaders through education, mentorship, and community engagement.",
            vision:
                "A Nigeria where every young person has the opportunity to reach their full potential and contribute meaningfully to society.",
            foundingStory:
                "Founded in 2020 by Gideon Dunioh, our organization was born from a deep passion for youth development and leadership. Witnessing the untapped potential in Nigerian youth, Gideon established this platform to bridge the gap between generations and create opportunities for young people to develop their skills, voice their ideas, and become agents of positive change in their communities.",
            founderName: "Gideon Dunioh",
            founderTitle: "Founder & Executive Director",
            founderMessage:
                "When I started this journey, I had one simple belief: that every young Nigerian has something valuable to contribute to our nation's future. Through our programs, we're not just teaching skills or providing opportunities – we're building a movement of young leaders who will transform Nigeria. Every essay submitted, every student mentored, every community impacted brings us closer to the Nigeria we all dream of. Thank you for being part of this journey.",
            founderImageUrl: "/uploads/founder/gideon-dunioh.png",
            contactEmail: "info@gideondunioh.org",
            contactPhone: "+234 XXX XXX XXXX",
        },
    });

    console.log("✅ Created site settings");

    // Core Values
    const values = [
        {
            title: "Integrity",
            description:
                "We uphold the highest standards of honesty and transparency in all our operations.",
            icon: "Shield",
            order: 1,
        },
        {
            title: "Excellence",
            description:
                "We strive for excellence in every program and interaction, ensuring quality outcomes.",
            icon: "Award",
            order: 2,
        },
        {
            title: "Inclusivity",
            description:
                "We believe in creating opportunities for all young Nigerians, regardless of background.",
            icon: "Users",
            order: 3,
        },
        {
            title: "Innovation",
            description:
                "We embrace creative solutions and new approaches to youth development challenges.",
            icon: "Lightbulb",
            order: 4,
        },
    ];

    for (const value of values) {
        await prisma.value.create({ data: value });
    }

    console.log("✅ Created core values");

    // History Milestones
    const milestones = [
        {
            year: "2020",
            title: "Foundation Established",
            description:
                "Gideon Dunioh founded the organization with a vision to empower Nigerian youth.",
            order: 1,
        },
        {
            year: "2021",
            title: "First Essay Competition",
            description:
                "Launched The Bridge Essay Competition with 150 participants from across Nigeria.",
            order: 2,
        },
        {
            year: "2023",
            title: "Mentorship Program Launch",
            description:
                "Expanded to include one-on-one mentorship connecting students with industry professionals.",
            order: 3,
        },
        {
            year: "2025",
            title: "1,000+ Students Impacted",
            description:
                "Reached milestone of impacting over 1,000 students through our various programs.",
            order: 4,
        },
    ];

    for (const milestone of milestones) {
        await prisma.milestone.create({ data: milestone });
    }

    console.log("✅ Created history milestones");

    // Programs
    const programs = [
        {
            name: "The Bridge Essay Competition",
            slug: "essay-competition",
            description:
                "Annual essay competition connecting generations through thoughtful writing.",
            longDescription:
                "Our flagship program invites secondary school students to explore themes of leadership, community, and intergenerational dialogue through essay writing. Winners receive scholarships and mentorship opportunities.",
            impact: "500+ students participated in 2025",
            imageUrl: "/uploads/programs/essay-competition.png",
            order: 1,
            active: true,
        },
        {
            name: "Leadership Training Program",
            slug: "leadership-training",
            description:
                "Intensive workshops developing leadership skills in young Nigerians.",
            longDescription:
                "A comprehensive 6-month program covering public speaking, critical thinking, project management, and community organizing. Participants work on real-world projects that benefit their communities.",
            impact: "200+ young leaders trained",
            imageUrl: "/uploads/programs/leadership-training.png",
            order: 2,
            active: true,
        },
        {
            name: "Mentorship Network",
            slug: "mentorship-network",
            description:
                "Connecting students with experienced professionals for guidance and support.",
            longDescription:
                "Our mentorship program pairs students with professionals in their fields of interest for one-on-one guidance, career advice, and skill development over a 12-month period.",
            impact: "150+ active mentorship pairs",
            imageUrl: "/uploads/programs/mentorship.png",
            order: 3,
            active: true,
        },
        {
            name: "Community Outreach",
            slug: "community-outreach",
            description:
                "Grassroots initiatives addressing local challenges through youth action.",
            longDescription:
                "Student-led community projects addressing issues like education access, environmental sustainability, and youth unemployment. We provide funding, training, and support.",
            impact: "30+ communities served",
            imageUrl: "/uploads/programs/community-outreach.png",
            order: 4,
            active: true,
        },
    ];

    for (const program of programs) {
        await prisma.program.create({ data: program });
    }

    console.log("✅ Created programs");

    // Impact Metrics
    const metrics = [
        {
            label: "Students Reached",
            value: "1,200+",
            icon: "GraduationCap",
            order: 1,
        },
        {
            label: "Scholarships Awarded",
            value: "₦5M+",
            icon: "Award",
            order: 2,
        },
        {
            label: "Communities Impacted",
            value: "30+",
            icon: "MapPin",
            order: 3,
        },
        {
            label: "Active Mentors",
            value: "150+",
            icon: "Users",
            order: 4,
        },
    ];

    for (const metric of metrics) {
        await prisma.impactMetric.create({ data: metric });
    }

    console.log("✅ Created impact metrics");

    // Get program IDs for testimonials
    const essayProgram = await prisma.program.findUnique({
        where: { slug: "essay-competition" },
    });
    const leadershipProgram = await prisma.program.findUnique({
        where: { slug: "leadership-training" },
    });

    // Testimonials
    const testimonials = [
        {
            name: "Chioma Okafor",
            location: "Lagos, Nigeria",
            quote:
                "The Bridge Essay Competition changed my life. Not only did I win a scholarship, but I gained confidence in my voice and my ability to contribute to important conversations about Nigeria's future.",
            imageUrl: "/uploads/testimonials/chioma.png",
            programId: essayProgram?.id,
            featured: true,
            order: 1,
        },
        {
            name: "Ibrahim Musa",
            location: "Kano, Nigeria",
            quote:
                "Through the mentorship program, I connected with a tech entrepreneur who guided me in starting my own software development business. I'm now employing other young people in my community.",
            imageUrl: "/uploads/testimonials/ibrahim.png",
            programId: leadershipProgram?.id,
            featured: true,
            order: 2,
        },
        {
            name: "Grace Adeyemi",
            location: "Ibadan, Nigeria",
            quote:
                "The leadership training gave me practical skills I use every day. I'm now leading a community project providing free tutoring to over 100 students in my neighborhood.",
            imageUrl: "/uploads/testimonials/grace.png",
            programId: leadershipProgram?.id,
            featured: true,
            order: 3,
        },
    ];

    for (const testimonial of testimonials) {
        await prisma.testimonial.create({ data: testimonial });
    }

    console.log("✅ Created testimonials");

    // Donation Tiers
    const donationTiers = [
        {
            amount: 2500,
            currency: "NGN",
            description: "Provides school supplies for one student for a month",
            order: 1,
        },
        {
            amount: 5000,
            currency: "NGN",
            description: "Sponsors one student's participation in the essay competition",
            order: 2,
        },
        {
            amount: 10000,
            currency: "NGN",
            description: "Funds a mentorship pair for three months",
            order: 3,
        },
        {
            amount: 25000,
            currency: "NGN",
            description: "Supports a community outreach project",
            order: 4,
        },
        {
            amount: 50000,
            currency: "NGN",
            description: "Provides a partial scholarship for one student",
            order: 5,
        },
    ];

    for (const tier of donationTiers) {
        await prisma.donationTier.create({ data: tier });
    }

    console.log("✅ Created donation tiers");

    // Volunteer Roles
    const volunteerRoles = [
        {
            title: "Essay Reviewer",
            description:
                "Help evaluate essay submissions and provide constructive feedback to students.",
            requirements:
                "Strong writing skills, attention to detail, commitment of 5-10 hours during competition season.",
            active: true,
            order: 1,
        },
        {
            title: "Mentor",
            description:
                "Guide a student through their academic and career journey over 12 months.",
            requirements:
                "Professional experience in your field, commitment of 2-4 hours per month, strong communication skills.",
            active: true,
            order: 2,
        },
        {
            title: "Event Coordinator",
            description:
                "Help organize and run our workshops, competitions, and community events.",
            requirements:
                "Event planning experience, organizational skills, availability for weekend events.",
            active: true,
            order: 3,
        },
        {
            title: "Social Media Ambassador",
            description:
                "Share our mission and programs on social media to reach more young people.",
            requirements:
                "Active social media presence, passion for youth development, creative content creation skills.",
            active: true,
            order: 4,
        },
    ];

    for (const role of volunteerRoles) {
        await prisma.volunteerRole.create({ data: role });
    }

    console.log("✅ Created volunteer roles");

    // Events
    const events = [
        {
            title: "2026 Essay Competition Launch",
            description:
                "Official launch event for this year's Bridge Essay Competition with keynote speakers and Q&A session.",
            date: new Date("2026-02-15T10:00:00"),
            endDate: new Date("2026-02-15T14:00:00"),
            location: "Lagos, Nigeria (Hybrid Event)",
            imageUrl: "/uploads/events/essay-launch.png",
            registrationUrl: "/submit",
            active: true,
        },
        {
            title: "Leadership Workshop Series",
            description:
                "Three-day intensive workshop on public speaking, critical thinking, and project management.",
            date: new Date("2026-03-20T09:00:00"),
            endDate: new Date("2026-03-22T17:00:00"),
            location: "Abuja, Nigeria",
            imageUrl: "/uploads/events/leadership-workshop.png",
            registrationUrl: "#",
            active: true,
        },
        {
            title: "Mentorship Networking Mixer",
            description:
                "Connect with potential mentors and fellow mentees in an informal networking environment.",
            date: new Date("2026-04-10T18:00:00"),
            endDate: new Date("2026-04-10T21:00:00"),
            location: "Port Harcourt, Nigeria",
            imageUrl: "/uploads/events/networking.png",
            registrationUrl: "#",
            active: true,
        },
    ];

    for (const event of events) {
        await prisma.event.create({ data: event });
    }

    console.log("✅ Created events");

    // Partners
    const partners = [
        {
            name: "Nigerian Education Foundation",
            logoUrl: "/uploads/partners/nef-logo.png",
            websiteUrl: "https://example.com",
            order: 1,
        },
        {
            name: "Youth Empowerment Initiative",
            logoUrl: "/uploads/partners/yei-logo.png",
            websiteUrl: "https://example.com",
            order: 2,
        },
        {
            name: "Tech Leaders Africa",
            logoUrl: "/uploads/partners/tla-logo.png",
            websiteUrl: "https://example.com",
            order: 3,
        },
        {
            name: "Community Development Network",
            logoUrl: "/uploads/partners/cdn-logo.png",
            websiteUrl: "https://example.com",
            order: 4,
        },
    ];

    for (const partner of partners) {
        await prisma.partner.create({ data: partner });
    }

    console.log("✅ Created partners");

    // Team Members
    const teamMembers = [
        {
            name: "Gideon Dunioh",
            title: "Founder & Executive Director",
            bio: "Gideon is a passionate advocate for youth development with over 10 years of experience in education and community organizing. He holds a degree in Leadership Studies and has dedicated his career to empowering the next generation of Nigerian leaders.",
            imageUrl: "/uploads/founder/gideon-dunioh.png",
            linkedIn: "https://linkedin.com/in/gideondunioh",
            email: "gideon@gideondunioh.org",
            order: 1,
        },
        {
            name: "Amina Bello",
            title: "Program Director",
            bio: "Amina oversees all our programs with a focus on impact and sustainability. With a background in education policy, she ensures our initiatives create lasting change in the communities we serve.",
            imageUrl: "/uploads/team/amina-bello.png",
            linkedIn: "#",
            email: "amina@gideondunioh.org",
            order: 2,
        },
        {
            name: "Chukwudi Okonkwo",
            title: "Mentorship Coordinator",
            bio: "Chukwudi manages our mentorship network, matching students with professionals and ensuring meaningful relationships develop. He brings 5 years of experience in youth mentorship programs.",
            imageUrl: "/uploads/team/chukwudi-okonkwo.png",
            linkedIn: "#",
            email: "chukwudi@gideondunioh.org",
            order: 3,
        },
        {
            name: "Fatima Abdullahi",
            title: "Communications Manager",
            bio: "Fatima tells our story to the world through strategic communications and social media. She's passionate about amplifying youth voices and showcasing the impact of our work.",
            imageUrl: "/uploads/team/fatima-abdullahi.png",
            linkedIn: "#",
            email: "fatima@gideondunioh.org",
            order: 4,
        },
    ];

    for (const member of teamMembers) {
        await prisma.teamMember.create({ data: member });
    }

    console.log("✅ Created team members");

    // Create admin user if doesn't exist
    const existingUser = await prisma.user.findUnique({
        where: { username: "admin" },
    });

    if (!existingUser) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await prisma.user.create({
            data: {
                username: "admin",
                password: hashedPassword,
            },
        });
        console.log("✅ Created admin user (username: admin, password: admin123)");
    }

    console.log("🎉 Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
