import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeContext } from './ThemeProvider';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Save, 
  FolderOpen, 
  Search, 
  GitBranch, 
  Settings, 
  Terminal,
  FileText,
  Folder,
  ChevronRight,
  ChevronDown,
  X,
  Plus,
  MoreHorizontal,
  Zap,
  Maximize,
  Minimize,
  Filter,
  Package,
  Bug,
  Database,
  Globe,
  Command,
  Copy,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Bookmark,
  BookmarkCheck,
  History,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Heart,
  MessageSquare,
  Share2,
  Link,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
  Menu,
  Grid,
  List,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Layers,
  Code2,
  Braces,
  Hash,
  AtSign,
  Percent,
  DollarSign,
  Euro,
  PoundSterling,
  Yen,
  IndianRupee,
  Bitcoin,
  Wallet,
  CreditCard,
  Banknote,
  Receipt,
  Calculator,
  TrendingUp,
  TrendingDown,
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Pulse,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero,
  Bluetooth,
  BluetoothConnected,
  BluetoothSearching,
  Usb,
  HardDrive,
  Server,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Watch,
  Headphones,
  Speaker,
  Mic,
  MicOff,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  Video,
  VideoOff,
  Image,
  Images,
  Film,
  Music,
  Radio,
  Tv,
  Gamepad,
  Gamepad2,
  Joystick,
  Dices,
  Puzzle,
  Target,
  Award,
  Trophy,
  Medal,
  Crown,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Lock,
  LockOpen,
  Key,
  Fingerprint,
  Scan,
  QrCode,
  Barcode,
  Tag,
  Tags,
  Bookmark as BookmarkIcon,
  Flag,
  MapPin as MapPinIcon,
  Navigation,
  Compass,
  Map,
  Route,
  Car,
  Truck,
  Bus,
  Bike,
  Plane,
  Train,
  Ship,
  Anchor,
  Fuel,
  Zap as ZapIcon,
  Battery,
  BatteryLow,
  Plug,
  PowerOff,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Umbrella,
  Thermometer,
  Wind,
  Snowflake,
  Droplets,
  Waves,
  Mountain,
  Tree,
  Flower,
  Leaf,
  Sprout,
  Apple,
  Cherry,
  Grape,
  Orange,
  Banana,
  Strawberry,
  Carrot,
  Corn,
  Pizza,
  Coffee,
  Wine,
  Beer,
  IceCream,
  Cake,
  Cookie,
  Candy,
  Utensils,
  UtensilsCrossed,
  ChefHat,
  Soup,
  Salad,
  Sandwich,
  Croissant,
  Donut,
  Pretzel,
  Popcorn,
  Milk,
  Egg,
  Fish,
  Beef,
  Drumstick,
  Wheat,
  Rice,
  Bread,
  Cheese,
  Honey,
  Salt,
  Pepper,
  Spice,
  Herb,
  Lemon,
  Lime,
  Coconut,
  Avocado,
  Tomato,
  Potato,
  Onion,
  Garlic,
  Mushroom,
  Broccoli,
  Lettuce,
  Cucumber,
  Pepper as PepperIcon,
  Chili,
  Pumpkin,
  Eggplant,
  Radish,
  Turnip,
  Beet,
  Cabbage,
  Spinach,
  Kale,
  Celery,
  Asparagus,
  Artichoke,
  Cauliflower,
  BellPepper,
  Jalapeno,
  Habanero,
  Ghost,
  Skull,
  Bone,
  Brain as BrainIcon,
  Dna,
  Microscope,
  TestTube,
  Beaker,
  Flask,
  Syringe,
  Pill,
  Stethoscope,
  Thermometer as ThermometerIcon,
  Bandage,
  Crutch,
  Wheelchair,
  Glasses,
  Sunglasses,
  Contact,
  Tooth,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Surprised,
  Confused,
  Sleepy,
  Tired,
  Sick,
  Dizzy,
  Worried,
  Sad,
  Happy,
  Love,
  Kiss,
  Hug,
  Handshake,
  ThumbsUp,
  ThumbsDown,
  Clap,
  Wave,
  Peace,
  PointUp,
  PointDown,
  PointLeft,
  PointRight,
  Muscle,
  Leg,
  Foot,
  Hand,
  Finger,
  Nail,
  Ear,
  Nose,
  Mouth,
  Tongue,
  Lips,
  Teeth,
  Eye as EyeIcon,
  Eyebrow,
  Eyelash,
  Hair,
  Beard,
  Mustache,
  Hat,
  Cap,
  Crown as CrownIcon,
  Helmet,
  Mask,
  Scarf,
  Tie,
  Bowtie,
  Shirt,
  Dress,
  Skirt,
  Pants,
  Shorts,
  Underwear,
  Socks,
  Shoes,
  Boots,
  Sandals,
  Heels,
  Sneakers,
  Slippers,
  Gloves,
  Mittens,
  Ring,
  Necklace,
  Bracelet,
  Earrings,
  Watch as WatchIcon,
  Bag,
  Backpack,
  Purse,
  Wallet as WalletIcon,
  Suitcase,
  Briefcase,
  Luggage,
  Package as PackageIcon,
  Box,
  Gift,
  Ribbon,
  Balloon,
  Confetti,
  Fireworks,
  Sparkles,
  Sparkle,
  Glitter,
  Rainbow,
  Star as StarIcon,
  Comet,
  Planet,
  Earth,
  Moon as MoonIcon,
  Sun as SunIcon,
  Galaxy,
  Rocket,
  Satellite,
  Telescope,
  Alien,
  Ufo,
  Robot,
  Cyborg,
  Android,
  Ios,
  Windows,
  Linux,
  Mac,
  Chrome,
  Firefox,
  Safari,
  Edge,
  Opera,
  Internet,
  Wifi as WifiIcon,
  Ethernet,
  Router,
  Modem,
  Antenna,
  Signal as SignalIcon,
  Tower,
  Broadcast,
  Radio as RadioIcon,
  Podcast,
  Microphone,
  Headset,
  Earbuds,
  Speaker as SpeakerIcon,
  Amplifier,
  Equalizer,
  Mixer,
  Turntable,
  Cd,
  Vinyl,
  Cassette,
  Tape,
  Record,
  Note,
  Notes,
  Sheet,
  Clef,
  Flat,
  Sharp,
  Rest,
  Metronome,
  Tuner,
  Piano,
  Keyboard,
  Guitar,
  Bass,
  Violin,
  Cello,
  Harp,
  Flute,
  Clarinet,
  Saxophone,
  Trumpet,
  Trombone,
  Horn,
  Tuba,
  Drums,
  Cymbal,
  Xylophone,
  Maracas,
  Tambourine,
  Triangle,
  Bell,
  Chime,
  Gong,
  Whistle,
  Harmonica,
  Accordion,
  Bagpipes,
  Didgeridoo,
  Sitar,
  Banjo,
  Mandolin,
  Ukulele,
  Lute,
  Harp as HarpIcon,
  Organ,
  Synthesizer,
  Sampler,
  Sequencer,
  LoopStation,
  Pedal,
  Amp,
  Cabinet,
  Rack,
  Console,
  Interface,
  Converter,
  Splitter,
  Adapter,
  Cable,
  Jack,
  Plug as PlugIcon,
  Socket,
  Switch,
  Button,
  Knob,
  Slider,
  Fader,
  Pot,
  Led,
  Display,
  Screen,
  Panel,
  Board,
  Circuit,
  Chip,
  Processor,
  Memory,
  Storage,
  Drive,
  Disk,
  Partition,
  Format,
  Backup,
  Restore,
  Sync,
  Update,
  Upgrade,
  Install,
  Uninstall,
  Configure,
  Optimize,
  Clean,
  Repair,
  Diagnose,
  Test,
  Debug,
  Compile,
  Build,
  Deploy,
  Launch,
  Run,
  Stop,
  Pause,
  Resume,
  Restart,
  Shutdown,
  Reboot,
  Sleep,
  Hibernate,
  Standby,
  Active,
  Idle,
  Busy,
  Loading,
  Processing,
  Waiting,
  Ready,
  Done,
  Success,
  Warning,
  Info,
  Question,
  Exclamation,
  Check,
  Cross,
  Tick,
  Mark,
  Dot,
  Circle,
  Square as SquareIcon,
  Diamond,
  Pentagon,
  Hexagon,
  Octagon,
  Oval,
  Rectangle,
  Parallelogram,
  Trapezoid,
  Rhombus,
  Kite,
  Arrow,
  Line,
  Curve,
  Angle,
  Degree,
  Radian,
  Pi,
  Infinity,
  Sum,
  Product,
  Integral,
  Derivative,
  Limit,
  Function,
  Variable,
  Constant,
  Equation,
  Formula,
  Expression,
  Term,
  Factor,
  Coefficient,
  Exponent,
  Base,
  Root,
  Power,
  Logarithm,
  Exponential,
  Trigonometry,
  Sine,
  Cosine,
  Tangent,
  Secant,
  Cosecant,
  Cotangent,
  Hyperbolic,
  Inverse,
  Complex,
  Real,
  Imaginary,
  Rational,
  Irrational,
  Integer,
  Natural,
  Whole,
  Prime,
  Composite,
  Even,
  Odd,
  Positive,
  Negative,
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Hundred,
  Thousand,
  Million,
  Billion,
  Trillion,
  Quadrillion,
  Quintillion,
  Sextillion,
  Septillion,
  Octillion,
  Nonillion,
  Decillion,
  Googol,
  Googolplex,
  Aleph,
  Beth,
  Gimel,
  Daleth,
  Alpha,
  Beta,
  Gamma,
  Delta,
  Epsilon,
  Zeta,
  Eta,
  Theta,
  Iota,
  Kappa,
  Lambda,
  Mu,
  Nu,
  Xi,
  Omicron,
  Pi as PiIcon,
  Rho,
  Sigma,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  Omega
} from 'lucide-react';

interface QubIDEProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  isRunning: boolean;
  output: string;
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  isOpen?: boolean;
  path: string;
  size?: string;
  modified?: string;
  language?: string;
}

interface Extension {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  downloads: string;
  rating: number;
  installed: boolean;
  enabled: boolean;
  icon: any;
  category: string;
}

interface SearchResult {
  file: string;
  line: number;
  column: number;
  text: string;
  preview: string;
}

const fileStructure: FileNode[] = [
  {
    name: 'quantum-circuits',
    type: 'folder',
    path: '/quantum-circuits',
    isOpen: true,
    children: [
      {
        name: 'src',
        type: 'folder',
        path: '/quantum-circuits/src',
        isOpen: true,
        children: [
          { 
            name: 'main.py', 
            type: 'file', 
            path: '/quantum-circuits/src/main.py',
            content: '# Main quantum circuit file\nfrom qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2, 2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure_all()',
            size: '2.1 KB',
            modified: '2 minutes ago',
            language: 'python'
          },
          { 
            name: 'gates.py', 
            type: 'file', 
            path: '/quantum-circuits/src/gates.py',
            content: '# Quantum gates implementation\nimport numpy as np\n\ndef hadamard():\n    return np.array([[1, 1], [1, -1]]) / np.sqrt(2)',
            size: '1.8 KB',
            modified: '5 minutes ago',
            language: 'python'
          },
          { 
            name: 'utils.py', 
            type: 'file', 
            path: '/quantum-circuits/src/utils.py',
            content: '# Utility functions\ndef measure_qubit(circuit, qubit):\n    circuit.measure(qubit, qubit)\n    return circuit',
            size: '956 B',
            modified: '1 hour ago',
            language: 'python'
          },
        ]
      },
      {
        name: 'examples',
        type: 'folder',
        path: '/quantum-circuits/examples',
        isOpen: false,
        children: [
          { 
            name: 'bell_state.py', 
            type: 'file', 
            path: '/quantum-circuits/examples/bell_state.py',
            content: '# Bell state example\nfrom qiskit import QuantumCircuit\n\nqc = QuantumCircuit(2, 2)\nqc.h(0)\nqc.cx(0, 1)\nqc.measure_all()',
            size: '1.2 KB',
            modified: '1 day ago',
            language: 'python'
          },
          { 
            name: 'teleportation.py', 
            type: 'file', 
            path: '/quantum-circuits/examples/teleportation.py',
            content: '# Quantum teleportation\nfrom qiskit import QuantumCircuit\n\n# Create teleportation circuit\nqc = QuantumCircuit(3, 3)',
            size: '3.4 KB',
            modified: '2 days ago',
            language: 'python'
          },
          { 
            name: 'grover.py', 
            type: 'file', 
            path: '/quantum-circuits/examples/grover.py',
            content: '# Grover\'s algorithm\nfrom qiskit import QuantumCircuit\nimport numpy as np\n\ndef grover_oracle():\n    pass',
            size: '4.7 KB',
            modified: '3 days ago',
            language: 'python'
          },
        ]
      },
      { 
        name: 'requirements.txt', 
        type: 'file', 
        path: '/quantum-circuits/requirements.txt',
        content: 'qiskit==0.45.0\nnumpy==1.24.3\nmatplotlib==3.7.1\njupyter==1.0.0',
        size: '156 B',
        modified: '1 week ago',
        language: 'text'
      },
      { 
        name: 'README.md', 
        type: 'file', 
        path: '/quantum-circuits/README.md',
        content: '# Quantum Circuits Project\n\nThis project contains quantum computing examples using Qiskit.\n\n## Getting Started\n\n1. Install dependencies: `pip install -r requirements.txt`\n2. Run examples: `python src/main.py`',
        size: '512 B',
        modified: '1 week ago',
        language: 'markdown'
      },
    ]
  }
];

const extensions: Extension[] = [
  {
    id: 'quantum-syntax',
    name: 'Quantum Syntax Highlighter',
    description: 'Advanced syntax highlighting for quantum computing languages',
    version: '2.1.0',
    author: 'Qub Team',
    downloads: '45.2K',
    rating: 4.8,
    installed: true,
    enabled: true,
    icon: Code2,
    category: 'Language Support'
  },
  {
    id: 'qiskit-intellisense',
    name: 'Qiskit IntelliSense',
    description: 'Intelligent code completion for Qiskit quantum circuits',
    version: '1.8.3',
    author: 'IBM Quantum',
    downloads: '32.1K',
    rating: 4.9,
    installed: true,
    enabled: true,
    icon: BrainIcon,
    category: 'IntelliSense'
  },
  {
    id: 'circuit-visualizer',
    name: 'Circuit Visualizer',
    description: 'Real-time quantum circuit visualization and debugging',
    version: '3.0.1',
    author: 'Quantum Dev',
    downloads: '28.7K',
    rating: 4.7,
    installed: false,
    enabled: false,
    icon: Eye,
    category: 'Visualization'
  },
  {
    id: 'quantum-debugger',
    name: 'Quantum Debugger',
    description: 'Step-by-step quantum circuit debugging and state inspection',
    version: '1.5.2',
    author: 'Debug Masters',
    downloads: '19.8K',
    rating: 4.6,
    installed: false,
    enabled: false,
    icon: Bug,
    category: 'Debugging'
  },
  {
    id: 'bloch-sphere',
    name: 'Bloch Sphere Viewer',
    description: 'Interactive Bloch sphere visualization for qubit states',
    version: '2.3.0',
    author: 'Quantum Viz',
    downloads: '15.4K',
    rating: 4.5,
    installed: true,
    enabled: false,
    icon: Globe,
    category: 'Visualization'
  },
  {
    id: 'quantum-snippets',
    name: 'Quantum Code Snippets',
    description: 'Pre-built code snippets for common quantum algorithms',
    version: '1.2.1',
    author: 'Snippet Pro',
    downloads: '12.3K',
    rating: 4.4,
    installed: false,
    enabled: false,
    icon: Package,
    category: 'Snippets'
  }
];

export const QubIDE: React.FC<QubIDEProps> = ({ code, onChange, onRun, isRunning, output }) => {
  const editorRef = useRef<any>(null);
  const { resolvedTheme } = useThemeContext();
  const [activeTab, setActiveTab] = useState('main.py');
  const [openTabs, setOpenTabs] = useState(['main.py']);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [showTerminal, setShowTerminal] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeView, setActiveView] = useState<'explorer' | 'search' | 'extensions' | 'git'>('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [fileTree, setFileTree] = useState<FileNode[]>(fileStructure);
  const [installedExtensions, setInstalledExtensions] = useState<Extension[]>(extensions);
  const [showExtensionDetails, setShowExtensionDetails] = useState<string | null>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Add custom keybindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
      setActiveView('search');
    });
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP, () => {
      // Quick file open
      console.log('Quick open triggered');
    });
  };

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  const openFile = (file: FileNode) => {
    if (!openTabs.includes(file.name)) {
      setOpenTabs([...openTabs, file.name]);
    }
    setActiveTab(file.name);
    setSelectedFile(file);
    if (file.content) {
      onChange(file.content);
    }
  };

  const closeTab = (fileName: string) => {
    const newTabs = openTabs.filter(tab => tab !== fileName);
    setOpenTabs(newTabs);
    if (activeTab === fileName && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]);
    }
  };

  const toggleFolder = (path: string) => {
    const updateTree = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.path === path && node.type === 'folder') {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setFileTree(updateTree(fileTree));
  };

  const handleRunCode = () => {
    setTerminalOutput(prev => [...prev, '$ qub run main.py']);
    setTerminalOutput(prev => [...prev, 'Executing quantum circuit...']);
    setTerminalOutput(prev => [...prev, 'Initializing qubits...']);
    setTerminalOutput(prev => [...prev, 'Applying quantum gates...']);
    onRun();
  };

  const clearTerminal = () => {
    setTerminalOutput([]);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const results: SearchResult[] = [];
    
    const searchInFile = (file: FileNode) => {
      if (file.type === 'file' && file.content) {
        const lines = file.content.split('\n');
        lines.forEach((line, index) => {
          if (line.toLowerCase().includes(query.toLowerCase())) {
            const column = line.toLowerCase().indexOf(query.toLowerCase());
            results.push({
              file: file.name,
              line: index + 1,
              column: column + 1,
              text: query,
              preview: line.trim()
            });
          }
        });
      }
      if (file.children) {
        file.children.forEach(searchInFile);
      }
    };

    fileTree.forEach(searchInFile);
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const installExtension = (extensionId: string) => {
    setInstalledExtensions(prev => 
      prev.map(ext => 
        ext.id === extensionId 
          ? { ...ext, installed: true, enabled: true }
          : ext
      )
    );
  };

  const uninstallExtension = (extensionId: string) => {
    setInstalledExtensions(prev => 
      prev.map(ext => 
        ext.id === extensionId 
          ? { ...ext, installed: false, enabled: false }
          : ext
      )
    );
  };

  const toggleExtension = (extensionId: string) => {
    setInstalledExtensions(prev => 
      prev.map(ext => 
        ext.id === extensionId 
          ? { ...ext, enabled: !ext.enabled }
          : ext
      )
    );
  };

  useEffect(() => {
    if (output) {
      setTerminalOutput(prev => [...prev, '', '=== Execution Results ===', output]);
    }
  }, [output]);

  useEffect(() => {
    if (searchQuery) {
      const debounceTimer = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node, index) => (
      <motion.div
        key={node.path}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.02 }}
        className="select-none"
      >
        <div
          className={`flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 group ${
            activeTab === node.name ? 'bg-quantum-100 dark:bg-quantum-900' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              openFile(node);
            }
          }}
        >
          {node.type === 'folder' && (
            <motion.div
              animate={{ rotate: node.isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 mr-1 text-gray-500" />
            </motion.div>
          )}
          {node.type === 'folder' ? (
            <Folder className={`w-4 h-4 mr-2 ${node.isOpen ? 'text-blue-500' : 'text-blue-400'}`} />
          ) : (
            <FileText className="w-4 h-4 mr-2 text-gray-500" />
          )}
          <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300 flex-1">
            {node.name}
          </span>
          {node.type === 'file' && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-1">
              <span className="text-xs text-gray-400">{node.size}</span>
            </div>
          )}
        </div>
        {node.children && node.isOpen && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderFileTree(node.children, depth + 1)}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    ));
  };

  const renderSearchView = () => (
    <div className="p-3">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search in files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-quantum-500 transition-colors duration-300"
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-quantum-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        {searchResults.length > 0 ? (
          <>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {searchResults.length} results in {new Set(searchResults.map(r => r.file)).size} files
            </div>
            {searchResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors duration-200"
                onClick={() => {
                  // Jump to search result
                  const file = fileTree.find(f => f.name === result.file);
                  if (file) openFile(file);
                }}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <FileText className="w-3 h-3 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{result.file}</span>
                  <span className="text-xs text-gray-400">:{result.line}:{result.column}</span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-800 p-1 rounded">
                  {result.preview}
                </div>
              </motion.div>
            ))}
          </>
        ) : searchQuery && !isSearching ? (
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No results found for "{searchQuery}"
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            Search for text in your files
          </div>
        )}
      </div>
    </div>
  );

  const renderExtensionsView = () => (
    <div className="p-3">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Extensions</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search extensions..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-quantum-500 transition-colors duration-300"
          />
        </div>
      </div>

      <div className="space-y-2">
        {installedExtensions.map((extension) => (
          <motion.div
            key={extension.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-quantum-100 dark:bg-quantum-900 rounded flex items-center justify-center">
                <extension.icon className="w-4 h-4 text-quantum-600 dark:text-quantum-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {extension.name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(extension.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {extension.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>{extension.author}</span>
                    <span>•</span>
                    <span>{extension.downloads} downloads</span>
                    <span>•</span>
                    <span>v{extension.version}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {extension.installed ? (
                      <>
                        <button
                          onClick={() => toggleExtension(extension.id)}
                          className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                            extension.enabled
                              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {extension.enabled ? 'Enabled' : 'Disabled'}
                        </button>
                        <button
                          onClick={() => uninstallExtension(extension.id)}
                          className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200"
                        >
                          Uninstall
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => installExtension(extension.id)}
                        className="text-xs px-2 py-1 bg-quantum-100 dark:bg-quantum-900 text-quantum-700 dark:text-quantum-300 rounded hover:bg-quantum-200 dark:hover:bg-quantum-800 transition-colors duration-200"
                      >
                        Install
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderGitView = () => (
    <div className="p-3">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Source Control</h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          quantum-circuits (main)
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">CHANGES (3)</h4>
          <div className="space-y-1">
            {[
              { file: 'src/main.py', status: 'M', color: 'text-yellow-600' },
              { file: 'src/gates.py', status: 'A', color: 'text-green-600' },
              { file: 'README.md', status: 'D', color: 'text-red-600' }
            ].map((change, index) => (
              <div key={index} className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                <span className={`text-xs font-mono ${change.color}`}>{change.status}</span>
                <FileText className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-700 dark:text-gray-300">{change.file}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <input
            type="text"
            placeholder="Commit message..."
            className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs focus:outline-none focus:ring-2 focus:ring-quantum-500 transition-colors duration-300"
          />
          <div className="flex items-center space-x-2 mt-2">
            <button className="flex-1 text-xs px-3 py-1.5 bg-quantum-600 dark:bg-quantum-500 text-white rounded hover:bg-quantum-700 dark:hover:bg-quantum-600 transition-colors duration-200">
              Commit
            </button>
            <button className="text-xs px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const containerClasses = isFullscreen 
    ? "fixed inset-0 z-50 bg-gray-50 dark:bg-gray-900" 
    : "h-full";

  return (
    <motion.div
      className={`${containerClasses} flex flex-col bg-gray-50 dark:bg-gray-900 transition-all duration-300`}
      animate={isFullscreen ? { scale: 1 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Top Bar */}
      <div className="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center space-x-2">
            <img 
              src="/logo copy.png" 
              alt="Qub Logo" 
              className="w-6 h-6"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
              Qub-code IDE
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all duration-300"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center space-x-2 px-3 py-1.5 bg-quantum-600 dark:bg-quantum-500 text-white rounded-md hover:bg-quantum-700 dark:hover:bg-quantum-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm"
          >
            {isRunning ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isRunning ? 'Running...' : 'Run Circuit'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all duration-300"
          >
            <Save className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Activity Bar */}
        <div className="w-12 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-2 space-y-2 transition-colors duration-300">
          {[
            { icon: FolderOpen, view: 'explorer', tooltip: 'Explorer' },
            { icon: Search, view: 'search', tooltip: 'Search' },
            { icon: GitBranch, view: 'git', tooltip: 'Source Control' },
            { icon: Package, view: 'extensions', tooltip: 'Extensions' },
          ].map(({ icon: Icon, view, tooltip }) => (
            <motion.button
              key={view}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveView(view as any)}
              className={`p-2 rounded transition-all duration-300 ${
                activeView === view 
                  ? 'bg-quantum-100 dark:bg-quantum-900 text-quantum-600 dark:text-quantum-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title={tooltip}
            >
              <Icon className="w-5 h-5" />
            </motion.button>
          ))}
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: sidebarWidth }}
          className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300 overflow-hidden"
        >
          <div className="h-full flex flex-col">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide transition-colors duration-300">
                {activeView === 'explorer' && 'Explorer'}
                {activeView === 'search' && 'Search'}
                {activeView === 'extensions' && 'Extensions'}
                {activeView === 'git' && 'Source Control'}
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              {activeView === 'explorer' && renderFileTree(fileTree)}
              {activeView === 'search' && renderSearchView()}
              {activeView === 'extensions' && renderExtensionsView()}
              {activeView === 'git' && renderGitView()}
            </div>
          </div>
        </motion.div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Tab Bar */}
          <div className="h-10 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center transition-colors duration-300">
            <AnimatePresence>
              {openTabs.map((tab, index) => (
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center px-3 py-2 border-r border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="text-sm">{tab}</span>
                  {openTabs.length > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(tab);
                      }}
                      className="ml-2 p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <X className="w-3 h-3" />
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Editor */}
          <div className="flex-1 bg-white dark:bg-gray-900 transition-colors duration-300">
            <Editor
              height="100%"
              defaultLanguage="python"
              value={code}
              onChange={handleChange}
              onMount={handleEditorDidMount}
              theme={resolvedTheme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: 'on',
                rulers: [80, 120],
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                insertSpaces: true,
                renderLineHighlight: 'line',
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: 'line',
                fontFamily: 'JetBrains Mono, Fira Code, Consolas, Monaco, monospace',
                fontLigatures: true,
                bracketPairColorization: { enabled: true },
                guides: {
                  bracketPairs: true,
                  indentation: true,
                },
                suggest: {
                  showKeywords: true,
                  showSnippets: true,
                },
                quickSuggestions: {
                  other: true,
                  comments: true,
                  strings: true,
                },
                folding: true,
                foldingStrategy: 'indentation',
                showFoldingControls: 'always',
                unfoldOnClickAfterEndOfLine: false,
                contextmenu: true,
                mouseWheelZoom: true,
                multiCursorModifier: 'ctrlCmd',
                accessibilitySupport: 'auto',
                find: {
                  addExtraSpaceOnTop: false,
                  autoFindInSelection: 'never',
                  seedSearchStringFromSelection: 'always',
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Terminal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: terminalHeight }}
            exit={{ height: 0 }}
            className="bg-gray-900 dark:bg-gray-950 border-t border-gray-700 transition-colors duration-300"
          >
            <div className="h-8 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 flex items-center justify-between px-3 transition-colors duration-300">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">Qub Terminal</span>
                <div className="flex items-center space-x-1 ml-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Connected</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={clearTerminal}
                  className="text-gray-400 hover:text-gray-200 transition-colors duration-200 text-xs px-2 py-1 rounded hover:bg-gray-700"
                >
                  Clear
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowTerminal(false)}
                  className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <div className="p-3 text-green-400 font-mono text-sm overflow-y-auto" style={{ height: terminalHeight - 32 }}>
              <div className="mb-2 text-gray-400">
                Qub Terminal v2.1.0 - Quantum Computing IDE
              </div>
              {terminalOutput.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="mb-1"
                >
                  {line}
                </motion.div>
              ))}
              {isRunning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-yellow-400"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span>Processing quantum circuit...</span>
                  </div>
                </motion.div>
              )}
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-quantum-400">qub@quantum:</span>
                <span className="text-blue-400">~/quantum-circuits$</span>
                <div className="w-2 h-4 bg-green-400 animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Toggle */}
      {!showTerminal && (
        <motion.button
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowTerminal(true)}
          className="fixed bottom-4 right-4 p-3 bg-quantum-600 dark:bg-quantum-500 text-white rounded-full shadow-lg hover:bg-quantum-700 dark:hover:bg-quantum-600 transition-all duration-300 z-50"
        >
          <Terminal className="w-5 h-5" />
        </motion.button>
      )}

      {/* Status Bar */}
      <div className="h-6 bg-quantum-600 dark:bg-quantum-700 text-white text-xs flex items-center justify-between px-4 transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <GitBranch className="w-3 h-3" />
            <span>main</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Python 3.9.7</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>UTF-8</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span>Ln {selectedFile ? '1' : '1'}, Col 1</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Spaces: 4</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Ready</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};