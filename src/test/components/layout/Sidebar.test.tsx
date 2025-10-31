import { render, screen } from "../../test-utils";
import { Sidebar } from "../../../components/layout/Sidebar";

describe("Sidebar", () => {
  it("should render all sidebar items", () => {
    render(<Sidebar />);

    const sidebar = document.querySelector(".side-menu");
    expect(sidebar).toBeDefined();

    const items = sidebar?.querySelectorAll(".item");
    expect(items?.length).toBe(4);
  });

  it("should render all icons with correct alt text", () => {
    render(<Sidebar />);

    expect(screen.getByAltText("Side Link Icon")).toBeDefined();
    expect(screen.getByAltText("Store Icon")).toBeDefined();
    expect(screen.getByAltText("Media Kit Icon")).toBeDefined();
    expect(screen.getByAltText("Invoicing Icon")).toBeDefined();
  });

  it("should have correct structure", () => {
    const { container } = render(<Sidebar />);
    const sideMenu = container.querySelector(".side-menu");

    expect(sideMenu).toBeDefined();
    expect(sideMenu?.children.length).toBe(4);
  });
});
