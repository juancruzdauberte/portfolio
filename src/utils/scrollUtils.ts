/**
 * Utility functions for smooth scrolling with lazy-loaded sections
 */

/**
 * Scrolls to a section by ID with retry mechanism for lazy-loaded content
 * @param sectionId - The ID of the section to scroll to
 * @param offset - Offset from the top (default: 80px for navbar)
 * @param maxRetries - Maximum number of retry attempts (default: 10)
 */
export const scrollToSection = (
  sectionId: string,
  offset: number = 200,
  maxRetries: number = 10
): void => {
  console.log(`[scrollToSection] Attempting to scroll to: ${sectionId}`);
  let retries = 0;

  const attemptScroll = () => {
    const element = document.getElementById(sectionId);
    console.log(
      `[scrollToSection] Attempt ${retries + 1}/${maxRetries}, element:`,
      element
    );

    if (element) {
      // Element found, perform scroll
      console.log(`[scrollToSection] Element found! Attempting scroll...`);

      // Método 1: Usar scrollIntoView (más confiable)
      try {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Ajustar el offset después del scroll
        setTimeout(() => {
          const currentScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({
            top: currentScroll - offset,
            behavior: "smooth",
          });
        }, 100);

        console.log(`[scrollToSection] Scroll initiated successfully`);
      } catch (error) {
        console.error(`[scrollToSection] Error during scroll:`, error);
      }
    } else if (retries < maxRetries) {
      // Element not found, retry after a short delay
      retries++;
      console.log(`[scrollToSection] Element not found, retrying in 100ms...`);
      setTimeout(attemptScroll, 100);
    } else {
      console.error(
        `[scrollToSection] Could not find element with ID "${sectionId}" after ${maxRetries} attempts`
      );
      console.log(
        "[scrollToSection] Available IDs:",
        Array.from(document.querySelectorAll("[id]")).map((el) => el.id)
      );
    }
  };

  attemptScroll();
};

/**
 * Check if an element exists in the DOM
 * @param sectionId - The ID of the section to check
 * @returns boolean indicating if the element exists
 */
export const elementExists = (sectionId: string): boolean => {
  return document.getElementById(sectionId) !== null;
};

/**
 * Wait for an element to appear in the DOM
 * @param sectionId - The ID of the section to wait for
 * @param timeout - Maximum time to wait in milliseconds (default: 5000)
 * @returns Promise that resolves when element is found or timeout is reached
 */
export const waitForElement = (
  sectionId: string,
  timeout: number = 5000
): Promise<HTMLElement | null> => {
  return new Promise((resolve) => {
    const element = document.getElementById(sectionId);

    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
};
