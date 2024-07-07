/*
 *
 * 지금까지 배운 객체 지향 프로그래밍의 SOLID 원칙과 함수형 프로그래밍의 개념들을 도입하여
 * 리팩터링 할 수 있는 부분을 진행해보세요.
 *
 * 유지보수 관점에서 리팩터링 전과 후를 비교하여 어떤 차이점이 있는지 정리해보세요.
 *
 */
class Employee {
  constructor(firstName, lastName, age, salary, department, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.salary = salary;
    this.department = department;
    this.role = role;
    this.employeeID = this.generateEmployeeID();
    this.leavesRemaining = 20;
    this.attendance = {};
    this.projects = [];
    this.workingHours = {};
  }

  generateEmployeeID() {
    return Math.floor(Math.random() * 10000);
  }

  giveRaise(percentage) {
    this.salary *= 1 + percentage / 100;
  }

  calculateBonus(performanceRating) {
    const baseBonus = 0.1 * this.salary;
    return performanceRating * baseBonus;
  }

  applyForLeave(days) {
    if (days <= this.leavesRemaining) {
      this.leavesRemaining -= days;
    }
  }

  markAttendance(date, hoursWorked) {
    this.workingHours[date] = hoursWorked;
  }

  checkAttendance(date) {
    return this.workingHours[date] || 0;
  }

  assignProject(project) {
    this.projects.push(project);
  }

  trackProjectProgress(project, hoursWorked) {
    console.log(
      `${this.getCamelCasedFullName()} has worked ${hoursWorked} hours on project: ${project}`
    );
  }

  calculateTotalWorkingHours(month) {
    const workingDays = Object.keys(this.workingHours).filter((date) =>
      date.includes(month)
    );
    let totalHours = 0;

    for (const date of workingDays) {
      totalHours += this.workingHours[date];
    }
    return totalHours;
  }

  handleOvertime(hours) {
    if (hours > 8) {
      const overtimeHours = hours - 8;
      console.log(
        `${this.getCamelCasedFullName()} worked ${overtimeHours} hours of overtime.`
      );
    } else {
      console.log(`${this.getCamelCasedFullName()} did not work overtime.`);
    }
  }

  getCamelCasedFullName() {
    const fullName = this.firstName + this.lastName;

    let result = "";
    let capitalizeNext = false;

    for (let i = 0; i < fullName.length; i++) {
      const char = fullName[i];

      if (char === "-" || char === "_") {
        capitalizeNext = true;
      } else {
        result += capitalizeNext ? char.toUpperCase() : char.toLowerCase();
        capitalizeNext = false;
      }
    }

    return result;
  }
}
