import {Input } from "./input"
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Trash2, Pen, Check} from "lucide-react";

export const HoverEffect = ({
  items,
  className,
  onDelete,
  onEdit
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    (<div
      className={cn("flex flex-col md:grid-cols-2  lg:flex-col  py-10", className)}>
      {items.map((item, idx) => (
        <Link
          to={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }} />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle onDelete={onDelete} onEdit={onEdit} title={item.title} description={item.description} id={item._id}>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>)
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        "rounded-xl h-32 w-full p-1 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}>
      <div className="relative z-50">
        {/* <div className="flex justify-end"><CardDelete/></div> */}
        <div className="p-4">{children}</div>
      </div>
    </div>)
  );
};
export const CardTitle = ({
  className,
  children, 
  onDelete, 
  onEdit,
  id, 
  title,
  description
}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDesc, setUpdatedDesc] = useState(description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(id, updatedTitle, updatedDesc);
    setIsEditing(false);
  };
  return ( 
  <div>
  {isEditing ? (
    <div>
      <Input
      type="text"
      value={updatedTitle}
      onChange={(e) => setUpdatedTitle(e.target.value)}
      className="text-zinc-100 max-w-2xl font-bold tracking-wide text-lg"
      
      />

      <span className="flex justify-end px-8">
      <Link onClick={handleSave}><Check/></Link>
      </span>
      <Input
      type="text"
      value={updatedDesc}
      onChange={(e) => setUpdatedDesc(e.target.value)}
      className="text-zinc-100 max-w-2xl pb-2 font-bold tracking-wide text-lg" 
      />

    </div>
  ) : (
  <div>
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-2 text-lg", className)}>
      {children}
    </h4>
    <span className="flex justify-end pr-2">
        <Link onClick={handleEdit}>
           <Pen/>
        </Link>
        <span className="px-2"></span>
        <Link onClick={() => onDelete(id)}>
            <Trash2/>
        </Link>
    </span>
    </div>)}
    </div>
  )
};
export const CardDescription = ({
  className,
  children
}) => {
  return (
    <p
      className={cn("mt-1 text-zinc-400 tracking-wide leading-relaxed text-md", className)}>
      {children}
    </p>
  );
};
