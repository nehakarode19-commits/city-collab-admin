import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface HierarchyNode {
  id: string;
  name: string;
  type: "country" | "state" | "city" | "chapter";
  activeMembers?: number;
  children?: HierarchyNode[];
}

const hierarchyData: HierarchyNode = {
  id: "india",
  name: "India",
  type: "country",
  children: [
    {
      id: "maharashtra",
      name: "Maharashtra",
      type: "state",
      children: [
        {
          id: "mumbai",
          name: "Mumbai",
          type: "city",
          children: [
            { id: "mumbai-central", name: "Mumbai Central Chapter", type: "chapter", activeMembers: 145 },
            { id: "mumbai-south", name: "Mumbai South Chapter", type: "chapter", activeMembers: 98 },
          ],
        },
        {
          id: "pune",
          name: "Pune",
          type: "city",
          children: [
            { id: "pune-west", name: "Pune West Chapter", type: "chapter", activeMembers: 112 },
          ],
        },
      ],
    },
    {
      id: "karnataka",
      name: "Karnataka",
      type: "state",
      children: [
        {
          id: "bangalore",
          name: "Bangalore",
          type: "city",
          children: [
            { id: "bangalore-tech", name: "Bangalore Tech Chapter", type: "chapter", activeMembers: 203 },
            { id: "bangalore-north", name: "Bangalore North Chapter", type: "chapter", activeMembers: 87 },
          ],
        },
      ],
    },
    {
      id: "delhi",
      name: "Delhi",
      type: "state",
      children: [
        {
          id: "delhi-city",
          name: "Delhi",
          type: "city",
          children: [
            { id: "delhi-east", name: "Delhi East Chapter", type: "chapter", activeMembers: 98 },
            { id: "delhi-central", name: "Delhi Central Chapter", type: "chapter", activeMembers: 134 },
          ],
        },
      ],
    },
  ],
};

interface TreeNodeProps {
  node: HierarchyNode;
  level: number;
}

function TreeNode({ node, level }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;

  const getNodeColor = () => {
    switch (node.type) {
      case "country":
        return "text-primary font-bold";
      case "state":
        return "text-info font-semibold";
      case "city":
        return "text-accent font-medium";
      case "chapter":
        return "text-foreground";
      default:
        return "text-foreground";
    }
  };

  const getNodeIcon = () => {
    switch (node.type) {
      case "city":
        return <MapPin className="h-4 w-4" />;
      case "chapter":
        return <Users className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-2 px-3 rounded-md hover:bg-muted/50 transition-colors",
          level === 0 && "bg-muted/30"
        )}
        style={{ marginLeft: `${level * 24}px` }}
      >
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
        {!hasChildren && <div className="w-6" />}
        
        <div className="flex items-center gap-2 flex-1">
          {getNodeIcon()}
          <span className={cn("text-sm", getNodeColor())}>{node.name}</span>
          {node.activeMembers && (
            <span className="text-xs text-muted-foreground ml-2">
              ({node.activeMembers} members)
            </span>
          )}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="mt-1">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function HierarchyTree() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-1">
          <TreeNode node={hierarchyData} level={0} />
        </div>
      </CardContent>
    </Card>
  );
}
