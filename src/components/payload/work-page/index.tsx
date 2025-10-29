import Link from "next/link";

export const WorkPageDescription = () => {
  return (
    <div className="space-y-2">
      <p className="font-medium text-lg">
        You are viewing the Work page configuration.
      </p>
      <p className="text-lg text-gray-500">
        To add work items to display on this page, navigate to the{" "}
        <Link
          className="font-bold no-underline"
          href="/admin/collections/work-items"
        >
          Work Items
        </Link>{" "}
        collection in the admin panel and create new entries.
      </p>
    </div>
  );
};
