---
layout: post
title: Nodes in Blazor Diagram Component | Syncfusion®
description: Create and arrange Blazor Diagram Component nodes that represent processes, entities, and data with custom shapes, sizes, and positions.
platform: diagram-sdk
control: Diagram Component
documentation: ug
---

# Nodes in Blazor Diagram Component

Nodes are graphical objects used to represent the geometric information, process flows, internal business procedures, entities, or any other kind of data and it represents the functions of a complete system, including how it interacts with external entities, providing a clear visual representation of complex processes and relationships.

![Node in Blazor Diagram](../images/blazor-diagram-node.webp)

## How to Create a Node

A node can be created and added to the diagram either programmatically or interactively. In the diagram area, nodes are stacked from bottom to top in the order they are added.

To learn more about creating nodes and exploring different node shapes in a Blazor Diagram, refer to the below video link.

{% youtube "youtube:https://www.youtube.com/watch?v=4_RCxBnDs3w" %}

## How to Add a Node Using the Nodes Collection

To create a node, define the [Node](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.Node.html) object and add it to the `Nodes` collection of the diagram. The following code example shows how to add a node to the diagram.

```cshtml
@using Syncfusion.Blazor.Diagram

<SfDiagramComponent Height="600px" Nodes="@_nodes" />

@code
{
    //Define diagram's nodes collection
    private DiagramObjectCollection<Node> _nodes;

    protected override void OnInitialized()
    {
        _nodes = new DiagramObjectCollection<Node>();
        // A node is created and stored in the nodes collection.
        Node node = new Node()
        {
            ID = "node1",
            // Position of the node
            OffsetX = 250,
            OffsetY = 250,
            // Size of the node
            Width = 100,
            Height = 100,
            Style = new ShapeStyle() { Fill = "#6495ED", StrokeColor = "white" }
        };
        // Add node
        _nodes.Add(node);
    }
}
```
A complete working sample can be downloaded from [GitHub](https://github.com/SyncfusionExamples/Blazor-UG-Examples/blob/master/Diagram/Server/Pages/Nodes/ActionsofNodes/AddNode.razor)

{% previewsample "https://blazorplayground.syncfusion.com/embed/rDVRDHVTTlEgoOnv?appbar=false&editor=false&result=true&errorlist=false&theme=fluent2" backgroundimage "[Adding a node from the nodes collection in Blazor Diagram](../images/blazor-diagram-add-node-from-collection.webp)" %}

>**Note:** Node ID should not start with numbers or special characters and should not contain special characters such as underscore(_) or space.

## How to Add Nodes at Runtime

A node can be added at runtime by adding it to the `Nodes` collection of the Blazor Diagram Component. The following code explains how to add a node at runtime.

```cshtml
@using Syncfusion.Blazor.Diagram
@using Syncfusion.Blazor.Buttons


<SfButton Content="Add Node" OnClick="@AddNode" />
<SfDiagramComponent Width="1000px" Height="500px" Nodes="@_nodes" />

@code
{
    //Define diagram's nodes collection
    private DiagramObjectCollection<Node> _nodes;
    private int _count = 1;

    protected override void OnInitialized()
    {
        _nodes = new DiagramObjectCollection<Node>();
        Node node = new Node()
        {
            ID = "node1",
            // Position of the node
            OffsetX = 250,
            OffsetY = 250,
            // Size of the node
            Width = 100,
            Height = 100,
            Style = new ShapeStyle() { Fill = "#6495ED" }
        };
        _nodes.Add(node);
    }
    //Method to add node at runtime
    private void AddNode()
    {
        Node newNode = new Node()
        {
            ID = "node" + ++_count,
            // Position of the node
            OffsetX = 450,
            OffsetY = 250,
            // Size of the node
            Width = 100,
            Height = 100,
            Style = new ShapeStyle() { Fill = "#6495ED" }
        };
        _nodes.Add(newNode);
    }
}
```
{% previewsample "https://blazorplayground.syncfusion.com/embed/rXLHZHVffajQZaTe?appbar=false&editor=false&result=true&errorlist=false&theme=fluent2" %}

A complete working sample can be downloaded from [GitHub](https://github.com/SyncfusionExamples/Blazor-UG-Examples/blob/master/Diagram/Server/Pages/Nodes/ActionsofNodes/AddNodeAtRuntime.razor)

## How to Add Multiple Nodes at Runtime

Multiple nodes can be added at runtime by creating node instances and adding them to the `Nodes` collection.

 The following example demonstrates how to add multiple nodes at runtime.

```cshtml
@using Syncfusion.Blazor.Diagram
@using Syncfusion.Blazor.Buttons

<div>
    <SfButton Content="Add Multiple Nodes"
              OnClick="@AddMultipleNodes" />
</div>

<SfDiagramComponent Height="500px" Width="700px" Nodes="@_nodes" />

@code
{
    private DiagramObjectCollection<Node> _nodes = new();

    private int _count = 1;

    protected override void OnInitialized()
    {
        _nodes.Add(new Node()
        {
            ID = "node1",
            OffsetX = 150,
            OffsetY = 150,
            Width = 100,
            Height = 100,
            Style = new ShapeStyle()
            {
                Fill = "#6495ED",
                StrokeColor = "white"
            }
        });
    }

    private void AddMultipleNodes()
    {
        for (int i = 0; i < 3; i++)
        {
            _nodes.Add(new Node()
            {
                ID = "node" + ++_count,
                OffsetX = 300 + (i * 150),
                OffsetY = 250,
                Width = 100,
                Height = 100,
                Style = new ShapeStyle()
                {
                    Fill = "#6495ED",
                    StrokeColor = "white"
                }
            });
        }
    }
}
```
## How to Add a Node with Annotations at Runtime

A node with an annotation can be added at runtime in the Blazor Diagram Component by using the [AddDiagramElementsAsync](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.SfDiagramComponent.html#Syncfusion_Blazor_Diagram_SfDiagramComponent_AddDiagramElementsAsync_Syncfusion_Blazor_Diagram_DiagramObjectCollection_Syncfusion_Blazor_Diagram_NodeBase__) method.

The following code explains how to add a node with an annotation at runtime by using the `AddDiagramElementsAsync` method.

```cshtml
@using Syncfusion.Blazor.Diagram
@using Syncfusion.Blazor.Buttons

<SfButton Content="AddLabel" OnClick="@AddNodeWithAnnotation" />
<SfDiagramComponent Height="600px" @ref="@_diagram" Nodes="@_nodes">
</SfDiagramComponent>

@code
{
    // Reference to diagram.
    private SfDiagramComponent _diagram;

    // Defines diagram's node collection.
    private DiagramObjectCollection<Node> _nodes;

    private DiagramObjectCollection<NodeBase> _nodeCollection = new DiagramObjectCollection<NodeBase>();

    protected override void OnInitialized()
    {
        _nodes = new DiagramObjectCollection<Node>();
        Node node = new Node()
        {
            Width = 100,
            Height = 100,
            OffsetX = 100,
            OffsetY = 100,
            Style = new ShapeStyle() { Fill = "#6495ED", StrokeColor = "white" },
        };
        _nodes.Add(node);
    }

    // Method to add node with annotation at runtime.
    private async Task AddNodeWithAnnotation()
    {
        Node newNode = new Node()
        {
            ID = "node2",
            // Position of the node.
            OffsetX = 250,
            OffsetY = 250,
            // Size of the node.
            Width = 100,
            Height = 100,
            Style = new ShapeStyle() { Fill = "#6495ED" },
            Annotations= new DiagramObjectCollection<ShapeAnnotation>()
            {
                new ShapeAnnotation()
                {
                    Content="NewAnnotation"
                }
            },
        };
        _nodeCollection .Add(newNode);
        await _diagram.AddDiagramElementsAsync(_nodeCollection );
    }
}
```
{% previewsample "https://blazorplayground.syncfusion.com/embed/VNVdZGCQrYRSHTrq?appbar=false&editor=false&result=true&errorlist=false&theme=fluent2" %}

## How to Add a Node to the Palette

Nodes can be predefined and added to the symbol palette, then dragged and dropped into the diagram when needed. For more information about adding nodes from symbol palette, refer to the [Symbol Palette](../symbol-palette).

* Once node/connector dragged from the palette to the diagram, the following events are raised for customization.
* When a symbol is dragged into a diagram from the symbol palette, the [DragStart](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.SfDiagramComponent.html#Syncfusion_Blazor_Diagram_SfDiagramComponent_DragStart) event is triggered. [DragStartEventArgs](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.DragStartEventArgs.html) notifies when the element enters the diagram from the symbol palette.
* When a symbol is dragged over a diagram, the [Dragging](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.SfDiagramComponent.html#Syncfusion_Blazor_Diagram_SfDiagramComponent_Dragging) event is triggered. [DraggingEventArgs](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.DraggingEventArgs.html) notifies when an element drags over another diagram element.
* When a symbol is dragged and dropped from the symbol palette to the diagram area, the [DragDrop](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.SfDiagramComponent.html#Syncfusion_Blazor_Diagram_SfDiagramComponent_DragDrop) event is triggered. [DropEventArgs](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.DropEventArgs.html) notifies when the element is dropped on the diagram.
* When a symbol is dragged outside the diagram, the [DragLeave](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.SfDiagramComponent.html#Syncfusion_Blazor_Diagram_SfDiagramComponent_DragLeave) event is triggered. [DragLeaveEventArgs](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.DragLeaveEventArgs.html) notifies when the element leaves the diagram.

![Adding nodes from the symbol palette in Blazor Diagram](../images/blazor-diagram-add-node-from-palette.webp)

## How to Draw Nodes Using Drawing Object

Nodes can be drawn interactively by clicking and dragging on the diagram surface by using the [DrawingObject](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.SfDiagramComponent.html#Syncfusion_Blazor_Diagram_SfDiagramComponent_DrawingObject) property of `SfDiagramComponent`. The following code example shows how to configure the diagram to draw a node once on the next click and drag.

```cshtml
@using Syncfusion.Blazor.Diagram

<SfDiagramComponent @ref="_diagram" Height="600px" Nodes="@_nodes" />

<SfButton Content="Draw Node" OnClick="@DrawNode" />

@code
{
    private SfDiagramComponent _diagram;
    private DiagramObjectCollection<Node> _nodes = new DiagramObjectCollection<Node>();

    private void DrawNode()
    {
        // Activate DrawOnce so the next click-drag draws a single element.
        _diagram.InteractionController = DiagramInteractions.DrawOnce;

        // Initialize the drawing object to draw a rectangle node.
        _diagram.DrawingObject = new Node()
        {
            ID = "node1",
            Shape = new BasicShape() { Type = NodeShapes.Basic, Shape = BasicShapes.Rectangle },
            Style = new ShapeStyle() { Fill = "#6495ED", StrokeColor = "white" }
        };
    }
}
```

For more information about drawing nodes, refer to the [Draw Nodes](https://help.syncfusion.com/diagram-sdk/blazor/tools#how-to-draw-shapes-using-the-drawing-tool).

![Drawing a node on the diagram surface in Blazor Diagram](../images/blazor-diagram-node-drawing.webp)

## How to Create Nodes from DataSource

Nodes can be generated automatically with the information provided through a data source. The default properties for these nodes are fetched from default settings. For more information about datasource, refer to [DataSource](../data-binding).

## How to Remove Selected Nodes at Runtime

A selected node can be removed from the diagram at runtime by using the `Remove` method.

The following example demonstrates how to remove a selected node at runtime.

```cshtml
@using Syncfusion.Blazor.Diagram
@using Syncfusion.Blazor.Buttons

<SfButton Content="Remove Node" OnClick="@RemoveNodes" />

<SfDiagramComponent @ref="_diagram" Width="1000px" Height="500px" Nodes="@_nodes" />

@code
{
    //Defines diagram's Node collection
    private DiagramObjectCollection<Node> _nodes;
    SfDiagramComponent _diagram;

    protected override void OnInitialized()
    {
        _nodes = new DiagramObjectCollection<Node>();
        Node node = new Node()
        {
            ID = "node1",
            // Position of the node
            OffsetX = 250,
            OffsetY = 250,
            // Size of the node
            Width = 100,
            Height = 100,
            Style = new ShapeStyle() { Fill = "#6495ED", StrokeColor = "white" }
        };
        // Add node
        _nodes.Add(node);
    }

    private void RemoveNodes()
    {
        // Remove Node at runtime
        if (_diagram.SelectionSettings.Nodes.Count > 0)
            _nodes.Remove(_diagram.SelectionSettings.Nodes[0]);
    }
}
```
{% previewsample "https://blazorplayground.syncfusion.com/embed/VNrdjxBTzkiplZkT?appbar=false&editor=false&result=true&errorlist=false&theme=fluent2" %}

A complete working sample can be downloaded from [GitHub](https://github.com/SyncfusionExamples/Blazor-UG-Examples/blob/master/Diagram/Server/Pages/Nodes/ActionsofNodes/RemoveNode.razor)

A node can also be removed from the diagram by using the native `RemoveAt` method. Refer to the following example to see how to remove the node at runtime.

```csharp
private void RemoveNodes()
{
    _nodes.RemoveAt(0);
}
```

## How to Remove a Node by ID at Runtime

A node can be removed at runtime using its `ID`, allowing a specific node to be deleted from the diagram.

The following example demonstrates how to remove a node by ID at runtime.

```cshtml
@using Syncfusion.Blazor.Diagram
@using Syncfusion.Blazor.Buttons

<SfButton Content="Remove Node by ID" OnClick="@RemoveNodeById" />

<SfDiagramComponent @ref="_diagram" Width="1000px" Height="500px" Nodes="@_nodes" />

@code
{
    // Defines diagram's node collection
    private DiagramObjectCollection<Node> _nodes;
    private SfDiagramComponent _diagram;

    protected override void OnInitialized()
    {
        _nodes = new DiagramObjectCollection<Node>();
        _nodes.Add(new Node()
        {
            ID = "node1",
            OffsetX = 250,
            OffsetY = 250,
            Width = 100,
            Height = 100,
            Style = new ShapeStyle() { Fill = "#6495ED", StrokeColor = "white" }
        });
        _nodes.Add(new Node()
        {
            ID = "node2",
            OffsetX = 450,
            OffsetY = 250,
            Width = 100,
            Height = 100,
            Style = new ShapeStyle() { Fill = "#FFB74D", StrokeColor = "white" }
        });
    }

    private void RemoveNodeById()
    {
        string nodeId = "node2";
        Node node = _nodes.FirstOrDefault(n => n.ID == nodeId);

        if (node != null)
        {
            _nodes.Remove(node);
        }
    }
}
```

## How to Remove Multiple Nodes at Runtime

Multiple nodes can be removed at runtime by using their IDs to identify and remove the corresponding nodes from the diagram.

The following example demonstrates how to remove multiple nodes at runtime.

```cshtml
@using Syncfusion.Blazor.Diagram
@using Syncfusion.Blazor.Buttons

<SfButton Content="Remove Multiple Nodes" OnClick="@RemoveMultipleNodes" />

<SfDiagramComponent @ref="_diagram" Width="1000px" Height="500px" Nodes="@_nodes" />

@code
{
    // Defines diagram's node collection
    private DiagramObjectCollection<Node> _nodes;
    private SfDiagramComponent _diagram;

    protected override void OnInitialized()
    {
        _nodes = new DiagramObjectCollection<Node>();

        _nodes.Add(new Node()
        {
            ID = "node1",
            OffsetX = 150,
            OffsetY = 200,
            Width = 100,
            Height = 100,
            Style = new ShapeStyle() { Fill = "#6495ED", StrokeColor = "white" }
        });

        _nodes.Add(new Node()
        {
            ID = "node2",
            OffsetX = 300,
            OffsetY = 200,
            Width = 100,
            Height = 100,
            Style = new ShapeStyle() { Fill = "#FFB74D", StrokeColor = "white" }
        });

        _nodes.Add(new Node()
        {
            ID = "node3",
            OffsetX = 450,
            OffsetY = 200,
            Width = 100,
            Height = 100,
            Style = new ShapeStyle() { Fill = "#4DB6AC", StrokeColor = "white" }
        });
    }

    private void RemoveMultipleNodes()
    {
        string[] nodeIds = { "node2", "node3" };

        foreach (string nodeId in nodeIds)
        {
            Node node = _nodes.FirstOrDefault(n => n.ID == nodeId);
            if (node != null)
            {
                _nodes.Remove(node);
            }
        }
    }
}
```
## How to Clone a Node at Runtime
[Clone](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.Node.html#Syncfusion_Blazor_Diagram_Node_Clone) is a virtual method of the node used to create a copy of a diagram object. After cloning, we need to set the ID for cloned nodes. The following code demonstrates how to clone the nodes during runtime.

```cshtml
@using Syncfusion.Blazor.Diagram
@using Syncfusion.Blazor.Buttons
@inject IJSRuntime js

<SfButton Content="Clone Node" OnClick="@CloneNodeMethod" />
<SfDiagramComponent @ref="_diagram" Width="50%" Height="500px" @bind-Nodes="_nodeCollection" />

@functions
{
    private SfDiagramComponent _diagram;
    private DiagramObjectCollection<Node> _nodeCollection = new DiagramObjectCollection<Node>();
    
    protected override void OnInitialized()
    {
        Node node1 = new Node()
        {
            ID = "node1",
            OffsetX = 100,
            OffsetY = 200,
            Height = 100,
            Width = 100,
            Annotations = new DiagramObjectCollection<ShapeAnnotation>()
            {
                new ShapeAnnotation()
                {
                    Content = "node1"
                },
            },
            Shape = new FlowShape() { Type = NodeShapes.Flow, Shape = NodeFlowShapes.Process }
        };
        _nodeCollection.Add(node1);
    }

    private async Task CloneNodeMethod()
    {
        Node node = _nodeCollection[0].Clone() as Node;
        node.ID = RandomId();
        node.OffsetX += 25;
        node.OffsetY += 25;
        await _diagram.AddDiagramElementsAsync(new DiagramObjectCollection<NodeBase>() { node });
    }

    private string RandomId()
    {
        Random random = new Random();
        const string Chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        return new string(Enumerable.Repeat(Chars, 5)
          .Select(s => s[random.Next(s.Length)]).ToArray());
    }
}
```
A complete working sample can be downloaded from [GitHub](https://github.com/SyncfusionExamples/Blazor-UG-Examples/blob/master/Diagram/Server/Pages/Nodes/CloneNode/CloneNode.razor)

{% previewsample "https://blazorplayground.syncfusion.com/embed/LtVRXRhppEMmdCcd?appbar=false&editor=false&result=true&errorlist=false&theme=fluent2" backgroundimage "[Clonning Node](../images/CloneNode.webp)" %}

## How to Update Nodes at Runtime

Node properties can be changed at runtime.

The following code example explains how to change node properties.

```cshtml
@using Syncfusion.Blazor.Diagram
@using Syncfusion.Blazor.Buttons

<SfButton Content="Update Node" OnClick="@UpdateNodes" />

<SfDiagramComponent @ref="_diagram" Width="1000px" Height="500px" Nodes="@_nodes" />

@code
{
    //Reference the diagram
    private SfDiagramComponent _diagram;
    //Defines diagram's node collection
    private DiagramObjectCollection<Node> _nodes;

    protected override void OnInitialized()
    {
        _nodes = new DiagramObjectCollection<Node>();
        Node node = new Node()
        {
            ID = "node1",
            // Position of the node
            OffsetX = 250,
            OffsetY = 250,
            // Size of the node
            Width = 100,
            Height = 100,
            Style = new ShapeStyle() { Fill = "#6495ED", StrokeColor = "white" }
        };
        _nodes.Add(node);
    }

    //Method to Update node's width and height at runtime
    private async Task UpdateNodes()
    {
        _diagram.BeginUpdate();
        _diagram.Nodes[0].Width = 50;
        _diagram.Nodes[0].Height = 50;
        await _diagram.EndUpdateAsync();
    }
}
```
{% previewsample "https://blazorplayground.syncfusion.com/embed/VZVRXRBTfOhscAKT?appbar=false&editor=false&result=true&errorlist=false&theme=fluent2" %}

A complete working sample can be downloaded from [GitHub](https://github.com/SyncfusionExamples/Blazor-UG-Examples/blob/master/Diagram/Server/Pages/Nodes/ActionsofNodes/UpdateNode.razor)

>**Note:** [BeginUpdate](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.SfDiagramComponent.html#Syncfusion_Blazor_Diagram_SfDiagramComponent_BeginUpdate) and [EndUpdateAsync](https://help.syncfusion.com/cr/blazor/Syncfusion.Blazor.Diagram.SfDiagramComponent.html#Syncfusion_Blazor_Diagram_SfDiagramComponent_EndUpdateAsync) methods allow you to stop the continuous update of control and resume it finally.

## See Also

* [How to add annotations to the node](../annotations/labels)

* [How to add ports to the node](../ports/ports)

* [How to enable/disable the behavior of the node](../constraints)

* [How to Disable Node Interaction While Maintaining Layout Updates in Blazor Diagram](https://support.syncfusion.com/kb/article/20189/how-to-disable-node-interaction-while-maintaining-layout-updates-in-syncfusion-blazor-diagram)
* [How to Drag a Node Programmatically Without User Interaction in Blazor Diagram](https://support.syncfusion.com/kb/article/20172/how-to-drag-a-node-programmatically-without-user-interaction-in-syncfusion-blazor-diagram)
* [How to Change Round Rectangle Border for Image Node in Blazor Diagram](https://support.syncfusion.com/kb/article/18698/how-to-change-round-rectangle-border-for-image-node-in-blazor-diagram)
* [How to Update HTML Node Size on HTML Template in Blazor Diagram](https://support.syncfusion.com/kb/article/18692/how-to-update-html-node-size-on-html-template-in-blazor-diagram)
* [How to Make HTML Node Resizable but Not Draggable in Blazor Diagram](https://support.syncfusion.com/kb/article/18727/how-to-make-html-node-resizable-but-not-draggable-in-blazor-diagram)
* [How to Dynamically Create and Connect Diagram Nodes with Annotations via Ports in Blazor Diagram](https://support.syncfusion.com/kb/article/19001/how-to-dynamically-create-and-connect-diagram-nodes-with-annotations-via-ports-in-syncfusion-blazor-diagram)
* [How to Add Fixed Handle to Diagram from the Palette in Blazor Diagram](https://support.syncfusion.com/kb/article/18707/how-to-add-fixed-handle-to-diagram-from-the-palette-in-blazor-diagram)
* [How to Add Custom HTML Nodes in Symbol Palette for Blazor Diagram](https://support.syncfusion.com/kb/article/18737/how-to-add-custom-html-nodes-in-symbol-palette-for-blazor-diagram)
* [How to Detect Nodes That Cross Page Breaks in Blazor Diagram](https://support.syncfusion.com/kb/article/20111/how-to-detect-nodes-that-cross-page-breaks-in-syncfusion-blazor-diagram)
* [How to Select a Group Child Element Without Selecting the Parent Group Node in Blazor Diagram Component](https://support.syncfusion.com/kb/article/18996/how-to-select-a-group-child-element-without-selecting-the-parent-group-node-in-syncfusion-blazor-diagram-component)
* [How to Update AddInfo Property for the Dropped Node in Blazor Diagram](https://support.syncfusion.com/kb/article/10948/how-to-update-addinfo-property-for-the-dropped-node-in-blazor-diagram)
* [How to Add Image Node in Symbol Palette in Blazor](https://support.syncfusion.com/kb/article/10090/how-to-add-image-node-in-symbol-palette-in-blazor)
* [How to Get the Mouse Position When Hovering Over the Diagram Area in Blazor Diagram](https://support.syncfusion.com/kb/article/18960/how-to-get-the-mouse-position-when-hovering-over-the-diagram-area-in-blazor-diagram)

* [How to Embed Diagrams Inside Panels of a Dashboard Layout in Blazor](https://support.syncfusion.com/kb/article/18993/how-to-embed-diagrams-inside-panels-of-a-dashboard-layout-in-blazor)
* [How to Zoom the Diagram Without Ctrl + Wheel and Enable Pan on Right Click Instead of Left Click in Blazor Diagram](https://support.syncfusion.com/kb/article/18992/how-to-zoom-the-diagram-without-ctrl--wheel-and-enable-pan-on-right-click-instead-of-left-click-in-blazor-diagram)
* [How to Export Blazor Diagram with Image Nodes to a PNG File](https://support.syncfusion.com/kb/article/18750/how-to-export-blazor-diagram-with-image-nodes-to-a-png-file)
* [How to Select and Highlight Ports and Connect Selected Elements in Blazor Diagram](https://support.syncfusion.com/kb/article/18997/how-to-select-and-highlight-ports-and-connect-selected-elements-in-syncfusion-blazor-diagram)
* [How to Create Polygon and Circle Shapes in Blazor Diagram](https://support.syncfusion.com/kb/article/18054/how-to-create-polygon-and-circle-shapes-in-blazor-diagram)

* [How to Provide ID for Diagram Elements in Blazor Diagrams](https://support.syncfusion.com/kb/article/17898/how-to-provide-ids-for-diagram-elements-in-blazor-diagrams)
