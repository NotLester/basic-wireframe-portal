"use client";

import { ContentLayout } from '@/components/custom/content-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/use-auth';

interface StudentData {
  name: string;
  id: string;
  course: string;
  semester: string;
  gpa: string;
  attendance: string;
  subjects: string[];
  assignments: Array<{
    subject: string;
    status: string;
    grade: string;
  }>;
  upcomingEvents: Array<{
    title: string;
    date: string;
    type: string;
  }>;
  courseProgress: Array<{
    subject: string;
    progress: number;
  }>;
}

interface FacultyData {
  name: string;
  id: string;
  department: string;
  designation: string;
  experience: string;
  courses: string[];
  students: number;
  publications: number;
  upcomingClasses: Array<{
    subject: string;
    time: string;
    class: string;
  }>;
  recentActivities: Array<{
    activity: string;
    timestamp: string;
  }>;
  stats: {
    averageAttendance: string;
    assignmentsGraded: number;
    totalAssignments: number;
    activePolls: number;
  };
}

const DUMMY_DATA: {
  student: StudentData;
  faculty: FacultyData;
} = {
  student: {
    name: "John Doe",
    id: "STU2024001",
    course: "Computer Science",
    semester: "8th",
    gpa: "3.8",
    attendance: "85%",
    subjects: [
      "Advanced Web Development",
      "Machine Learning",
      "Cloud Computing",
    ],
    assignments: [
      { subject: "Web Dev", status: "Submitted", grade: "A" },
      { subject: "ML", status: "Pending", grade: "-" },
      { subject: "Cloud", status: "Graded", grade: "A-" },
    ],
    upcomingEvents: [
      { title: "ML Project Submission", date: "Mar 25", type: "Deadline" },
      { title: "Web Dev Quiz", date: "Mar 28", type: "Test" },
      { title: "Cloud Lab", date: "Mar 30", type: "Lab" },
    ],
    courseProgress: [
      { subject: "Advanced Web Development", progress: 75 },
      { subject: "Machine Learning", progress: 60 },
      { subject: "Cloud Computing", progress: 45 },
    ],
  },
  faculty: {
    name: "Dr. Sarah Wilson",
    id: "FAC2024001",
    department: "Computer Science",
    designation: "Associate Professor",
    experience: "8 years",
    courses: ["Web Development", "Software Engineering", "Database Systems"],
    students: 120,
    publications: 15,
    upcomingClasses: [
      { subject: "Web Development", time: "10:00 AM", class: "CS-A" },
      { subject: "Database Systems", time: "2:00 PM", class: "CS-B" },
      { subject: "Software Engineering", time: "4:00 PM", class: "CS-C" },
    ],
    recentActivities: [
      { activity: "Graded Web Dev Assignments", timestamp: "2 hours ago" },
      { activity: "Created new poll in SE class", timestamp: "5 hours ago" },
      { activity: "Updated course materials", timestamp: "1 day ago" },
    ],
    stats: {
      averageAttendance: "78%",
      assignmentsGraded: 45,
      totalAssignments: 60,
      activePolls: 2,
    },
  },
};

export default function PortalPage() {
  const user = useAuth((state) => state.user);
  const userType = user?.userType;

  if (!user) {
    return null;
  }

  if (userType === "student") {
    const data = DUMMY_DATA.student;
    return (
      <ContentLayout title="Student Dashboard">
        <div className="h-full">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome, {data.name}
                </h1>
                <p className="text-muted-foreground">ID: {data.id}</p>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <InfoCard title="Academic Info">
                  <InfoItem label="Course" value={data.course} />
                  <InfoItem label="Semester" value={data.semester} />
                  <InfoItem label="GPA" value={data.gpa} />
                  <InfoItem label="Attendance" value={data.attendance} />
                </InfoCard>

                <InfoCard title="Course Progress">
                  <div className="space-y-4">
                    {data.courseProgress.map((course) => (
                      <div key={course.subject} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span>{course.subject}</span>
                          <span className="text-muted-foreground">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </InfoCard>
              </div>

              <div className="space-y-6">
                <InfoCard title="Upcoming Events">
                  <div className="space-y-4">
                    {data.upcomingEvents.map((event) => (
                      <div
                        key={event.title}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.date}
                          </p>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {event.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </InfoCard>

                <InfoCard title="Recent Assignments">
                  <div className="space-y-4">
                    {data.assignments.map((assignment) => (
                      <div
                        key={assignment.subject}
                        className="flex items-center justify-between"
                      >
                        <span className="font-medium">
                          {assignment.subject}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              assignment.status === "Submitted"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : assignment.status === "Graded"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {assignment.status}
                          </span>
                          <span className="font-medium">
                            {assignment.grade}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfoCard>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    );
  }

  // Faculty view
  const data = DUMMY_DATA.faculty;
  return (
    <ContentLayout title="Faculty Dashboard">
      <div className="h-full">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome, {data.name}
              </h1>
              <p className="text-muted-foreground">ID: {data.id}</p>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <InfoCard title="Professional Info">
                <InfoItem label="Department" value={data.department} />
                <InfoItem label="Designation" value={data.designation} />
                <InfoItem label="Experience" value={data.experience} />
                <InfoItem
                  label="Publications"
                  value={data.publications.toString()}
                />
              </InfoCard>

              <InfoCard title="Quick Stats">
                <div className="grid grid-cols-2 gap-4">
                  <StatCard
                    title="Average Attendance"
                    value={data.stats.averageAttendance}
                  />
                  <StatCard
                    title="Active Polls"
                    value={data.stats.activePolls.toString()}
                  />
                  <StatCard
                    title="Assignments Graded"
                    value={`${data.stats.assignmentsGraded}/${data.stats.totalAssignments}`}
                  />
                  <StatCard
                    title="Total Students"
                    value={data.students.toString()}
                  />
                </div>
              </InfoCard>
            </div>

            <div className="space-y-6">
              <InfoCard title="Upcoming Classes">
                <div className="space-y-4">
                  {data.upcomingClasses.map((class_) => (
                    <div
                      key={`${class_.subject}-${class_.time}`}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{class_.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          Class: {class_.class}
                        </p>
                      </div>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {class_.time}
                      </span>
                    </div>
                  ))}
                </div>
              </InfoCard>

              <InfoCard title="Recent Activities">
                <div className="space-y-4">
                  {data.recentActivities.map((activity) => (
                    <div
                      key={`${activity.activity}-${activity.timestamp}`}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium">{activity.activity}</span>
                      <span className="text-sm text-muted-foreground">
                        {activity.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </InfoCard>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}
