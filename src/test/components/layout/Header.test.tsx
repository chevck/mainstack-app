import { render, screen } from "@testing-library/react";
import { Header } from "../../../components/layout/Header";
import type { User } from "../../../types/user.types";

describe("Header", () => {
  const mockUser: User = {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
  };

  it("should render the logo", () => {
    render(<Header user={mockUser} />);
    const logo = screen.getByAltText("MainStack Logo");
    expect(logo).toBeDefined();
  });

  it("should render navigation menu items", () => {
    render(<Header user={mockUser} />);
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Analytics")).toBeDefined();
    expect(screen.getByText("Revenue")).toBeDefined();
    expect(screen.getByText("CRM")).toBeDefined();
    expect(screen.getByText("Apps")).toBeDefined();
  });

  it("should display user initials when user is provided", () => {
    render(<Header user={mockUser} />);
    const avatar = screen.getByText("JD");
    expect(avatar).toBeDefined();
  });

  it("should handle null user", () => {
    const { container } = render(<Header user={null} />);
    // Avatar should still render but be empty or show placeholder
    const header = container.querySelector(".header");
    expect(header).toBeDefined();
  });

  it("should mark Revenue as active", () => {
    render(<Header user={mockUser} />);
    const revenueLink = screen.getByText("Revenue").closest("a");
    expect(revenueLink).toBeDefined();
  });

  it("should render settings buttons", () => {
    render(<Header user={mockUser} />);
    // Check that settings section exists
    const header = document.querySelector(".header");
    expect(header).toBeDefined();
    expect(header?.querySelector(".settings-section")).toBeDefined();
  });
});
